import { IItem } from 'common/interfaces/products';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

export const productDTO = (data: IItem): IItem => {
  return {
    ...data,
    id: uuidv4(),
    timestamp: moment().format('DD/MM/YYYY HH:mm:ss'),
  };
};
