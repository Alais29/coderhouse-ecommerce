import 'dotenv/config.js';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import path from 'path';
import routes from 'routes';
import { unknownEndpoint } from 'middlewares/unknownEndpoint';
import { errorHandler } from 'middlewares/errorHandler';

const app: express.Application = express();
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor inicializado en http://localhost:${PORT}`);
});
server.on('error', error => console.log(`Error en el servidor: ${error}`));

const oneMinute = 1000 * 60;

app.use(express.static(path.resolve(__dirname, '../', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  session({
    secret: 'b2xyddLPtfeK0ryUgbLZ',
    cookie: { maxAge: oneMinute },
    saveUninitialized: true,
    resave: true,
  }),
);

app.use('/api', routes);

app.use(errorHandler);
app.use(unknownEndpoint);
