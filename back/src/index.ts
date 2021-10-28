import Config from 'config';
import Server from 'services/server';
import os from 'os';
import cluster from 'cluster';

const PORT = Config.PORT || 8080;

const numCPUs = os.cpus().length;

if (Config.MODE === 'cluster' && cluster.isMaster) {
  console.log(`NUMERO DE CPUS ===> ${numCPUs}`);
  console.log(`PID MASTER ${process.pid}, ${new Date()}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', worker => {
    console.log(`Worker ${worker.process.pid} died at ${Date()}`);
    cluster.fork();
  });
} else {
  Server.listen(PORT, () => {
    console.log(`Servidor inicializado en http://localhost:${PORT}`);
  });
  Server.on('error', error => console.log(`Error en el servidor: ${error}`));
}
