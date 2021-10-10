import args from 'args';
import { fork } from 'child_process';
import express, { Request, Response } from 'express';
import productoRouter from './producto';
import carritoRouter from './carrito';
import loginRouter from './login';
import { isLoggedIn } from 'middlewares/auth';
import { IObject } from 'common/interfaces';
import { getRandomNums } from 'utils/getRandomNums';
import path from 'path';

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
  };

  res.json({ data: info });
});

router.use('/randoms', (req: Request, res: Response) => {
  const { cant } = req.query;
  const numberQty = cant || String(100000000);
  const scriptPath = path.resolve(
    __dirname,
    '../../build/src/utils/getRandomNums.js',
  );

  const numData = fork(scriptPath, [numberQty as string]);
  numData.send('start');
  numData.on('message', result => {
    res.json({ data: result });
  });
});

export default router;
