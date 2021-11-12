import express from 'express';
import helmet from 'helmet';
import session from 'express-session';
import cors from 'cors';
import path from 'path';
import * as http from 'http';
import MongoStore from 'connect-mongo';
import swaggerUi from 'swagger-ui-express';
import docs from 'docs';
import Config from 'config';
import routes from 'routes';
import { unknownEndpoint } from 'middlewares/unknownEndpoint';
import { errorHandler } from 'middlewares/errorHandler';
import { clientPromise } from 'services/mongodb';
import passport from 'middlewares/auth';

const app: express.Application = express();

app.use(express.static('public'));
app.use('/uploads', express.static(path.resolve('uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use(
  session({
    secret: Config.SESSION_SECRET,
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
      maxAge: Config.SESSION_COOKIE_TIMEOUT_MIN * 1000 * 60,
      httpOnly: false,
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));

app.use(errorHandler);
app.use(unknownEndpoint);

const Server = new http.Server(app);

export default Server;
