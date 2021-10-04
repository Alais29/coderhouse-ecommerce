import 'dotenv/config.js';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import path from 'path';
import MongoStore from 'connect-mongo';
import routes from 'routes';
import { unknownEndpoint } from 'middlewares/unknownEndpoint';
import { errorHandler } from 'middlewares/errorHandler';
import { clientPromise } from 'services/mongodb';
import passport from 'middlewares/auth';

const app: express.Application = express();
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor inicializado en http://localhost:${PORT}`);
});
server.on('error', error => console.log(`Error en el servidor: ${error}`));

const tenMinutes = 1000 * 60 * 10;

app.use(express.static(path.resolve(__dirname, '../', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
  session({
    secret: 'b2xyddLPtfeK0ryUgbLZ',
    resave: true,
    saveUninitialized: false,
    rolling: true,
    store: MongoStore.create({
      clientPromise,
      stringify: false,
      autoRemove: 'interval',
      autoRemoveInterval: 1,
    }),
    cookie: {
      maxAge: tenMinutes,
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);

app.use(errorHandler);
app.use(unknownEndpoint);
