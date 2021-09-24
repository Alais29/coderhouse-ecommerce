import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import http from 'http';
import path from 'path';
import routes from 'routes';
import { initWsServer } from 'services/socket';
import { unknownEndpoint } from 'middlewares/unknownEndpoint';
import { errorHandler } from 'middlewares/errorHandler';

const app: express.Application = express();
const PORT = process.env.PORT || 8080;

const server: http.Server = http.createServer(app);
initWsServer(server);

server.listen(PORT, () => {
  console.log(`Servidor inicializado en http://localhost:${PORT}`);
});
server.on('error', error => console.log(`Error en el servidor: ${error}`));

app.use(express.static(path.resolve(__dirname, '../', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', routes);

app.use(errorHandler);
app.use(unknownEndpoint);
