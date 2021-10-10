import { IObject } from 'common/interfaces';

export const getRandomNums = (): IObject => {
  const numberObject: IObject = {};
  for (let i = 0; i < Number(process.argv[2]); i++) {
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
    console.log('Start getRandomNums');
    const result = getRandomNums();

    if (process && process.send) {
      process.send(result);
    }
  }
});
