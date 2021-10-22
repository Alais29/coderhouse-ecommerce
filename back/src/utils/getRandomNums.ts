import { IObject } from 'common/interfaces';
import { logger } from 'utils/logger';

export const getRandomNums = (numberQty?: number): IObject => {
  const numberObject: IObject = {};
  const numberQtyToUse = numberQty || Number(process.argv[2]);
  for (let i = 0; i < numberQtyToUse; i++) {
    const randomNum = String(Math.floor(Math.random() * (1000 - 1 + 1) + 1));
    if (!numberObject[randomNum]) {
      numberObject[randomNum] = 1;
    } else {
      (numberObject[randomNum] as number)++;
    }
  }
  return numberObject;
};

process.on('message', msg => {
  if (msg === 'start') {
    logger.info('Start getRandomNums');
    const result = getRandomNums();

    if (process && process.send) {
      process.send(result);
    }
  }
});
