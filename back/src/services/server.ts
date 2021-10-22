import express from 'express';
import compression from 'compression';
import path from 'path';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'middlewares/auth';
import routes from 'routes';
import { clientPromise } from 'services/mongodb';
import { unknownEndpoint } from 'middlewares/unknownEndpoint';
import { errorHandler } from 'middlewares/errorHandler';

const app: express.Application = express();

const tenMinutes = 1000 * 60 * 10;

app.use(compression());
app.use(express.static(path.resolve(__dirname, '../../', 'public')));
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

export default app;
