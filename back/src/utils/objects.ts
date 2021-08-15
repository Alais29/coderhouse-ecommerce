import { IObject } from '../common/interfaces';
import { isEmpty } from './others';

export const getEmptyFields = (object: IObject): unknown[] => {
  const keysValues = Object.entries(object);
  const empty: unknown[] = [];
  
  keysValues.forEach((item) => {
    if (isEmpty(item[1])) {
      empty.push(item[0]);
    }
  });
  
  return empty;
};