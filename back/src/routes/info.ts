import express, { Request, Response } from 'express';
import os from 'os';
import Config from 'config';

const infoRouter = express.Router();

infoRouter.get('/', async (req: Request, res: Response): Promise<void> => {
  const info = {
    PORT: Config.PORT,
    clusterMode: Config.MODE === 'cluster',
    os: process.platform,
    cpus: os.cpus().length,
    nodeVersion: process.version,
    memory: process.memoryUsage(),
    processId: process.pid,
    path: process.cwd(),
  };

  res.json({ data: info });
});

export default infoRouter;
