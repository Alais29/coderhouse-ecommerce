import { IItem } from 'common/interfaces';
import { productosModel } from 'models/fs/producto';

interface IModel {
  get: (id?: string) => Promise<IItem | IItem[]>
  save: (producto: IItem) => Promise<IItem>
  update: (id: string, producto: IItem) => Promise<IItem>
  delete: (id: string) => Promise<void>
}

const models = [productosModel];

export class ProductosModelFactory {
  public modelNumber: number;
  constructor(modelNumber: number) {
    this.modelNumber = modelNumber;
  }

  model(): IModel {
    return models[this.modelNumber];
  }
}