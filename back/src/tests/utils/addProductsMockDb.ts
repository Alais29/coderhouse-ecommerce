import { productosMock } from 'mocks/products';
import { ProductosModel } from 'models/mongoDb/producto';
import { logger } from 'services/logger';

export const addProductsMockDb = async (): Promise<void> => {
  await ProductosModel.insertMany(productosMock);
  logger.info('Productos agregados');
};
