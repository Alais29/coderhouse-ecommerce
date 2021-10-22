import 'dotenv/config.js';
import os from 'os';
import cluster from 'cluster';
import args from 'args';
import Config from 'config';
import Server from 'services/server';
import { logger } from 'utils/logger';

const numCPUs = os.cpus().length;
const flags = args.parse(process.argv);

if (flags.mode === 'cluster' && flags.run !== 'pm2' && cluster.isMaster) {
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
  const PORT = Config.PORT;
  Server.listen(PORT, () => {
    logger.info(
      `Servidor inicializado en http://localhost:${PORT} - PID WORKER ${process.pid}`,
    );
  });
  Server.on('error', error => logger.error(`Error en el servidor: ${error}`));
}
