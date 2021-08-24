import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';
import { unknownEndpoint } from './middlewares/unknownEndpoint';

const app: express.Application = express();
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor inicializado en http://localhost:${PORT}`);
});
server.on('error', (error) => console.log(`Error en el servidor: ${error}`));

app.use(express.static(path.resolve(__dirname, '../', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', routes);

app.use(unknownEndpoint);
