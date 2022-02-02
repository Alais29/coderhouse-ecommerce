import Config from 'config';
import Server from 'services/server';
import os from 'os';
import cluster from 'cluster';
import { logger } from 'services/logger';

const PORT = Config.PORT || 8080;

const numCPUs = os.cpus().length;

if (Config.MODE === 'cluster' && cluster.isMaster) {
  logger.info(`NUMERO DE CPUS ===> ${numCPUs}`);
  logger.info(`PID MASTER ${process.pid}, ${new Date()}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', worker => {
    logger.warn(`Worker ${worker.process.pid} died at ${Date()}`);
    cluster.fork();
  });
} else {
  Server.listen(PORT, () => {
    logger.info(`Servidor inicializado en http://localhost:${PORT}`);
    logger.info(`Se utilizará BD: ${Config.MONGO_ATLAS_DB}`);
  });
  Server.on('error', error => logger.error(`Error en el servidor: ${error}`));
}
