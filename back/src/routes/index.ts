import args from 'args';
import os from 'os';
import { fork } from 'child_process';
import express, { Request, Response } from 'express';
import productoRouter from './producto';
import carritoRouter from './carrito';
import loginRouter from './login';
import { isLoggedIn } from 'middlewares/auth';
import path from 'path';
import { getRandomNums } from 'utils/getRandomNums';
import { logger } from 'utils/logger';

const router = express.Router();

router.use('/auth', loginRouter);
router.use('/productos', isLoggedIn, productoRouter);
router.use('/carrito', isLoggedIn, carritoRouter);

router.use('/info', (req: Request, res: Response) => {
  const flags = args.parse(process.argv);
  const info = {
    args: flags,
    os: process.platform,
    nodeVersion: process.version,
    memory: process.memoryUsage(),
    processId: process.pid,
    folder: process.cwd(),
    numCPUs: os.cpus().length,
  };
  console.log(info);
  res.json({ data: info });
});

router.use('/randoms', (req: Request, res: Response) => {
  const { cant } = req.query;
  const numberQty = cant || String(100000000);
  const scriptPath = path.resolve(
    __dirname,
    '../../build/src/utils/getRandomNums.js',
  );

  const flags = args.parse(process.argv);

  if (flags.mode !== 'cluster') {
    logger.warn('on fork mode');
    const numData = fork(scriptPath, [numberQty as string]);
    numData.send('start');
    numData.on('message', result => {
      res.json({
        data: {
          args: flags,
          processId: process.pid,
          result,
        },
      });
    });
  } else {
    logger.warn('on cluster mode');
    const result = getRandomNums(Number(numberQty));
    res.json({
      data: {
        args: flags,
        processId: process.pid,
        result,
      },
    });
  }
});

router.use('/muerte', (req, res) => {
  res.json({ msg: 'OK' });
  logger.error(`PID => ${process.pid} will die`);
  process.exit(0);
});

export default router;
