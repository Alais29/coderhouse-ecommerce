import { IItem } from 'common/interfaces';
import { carritoModel } from 'models/fs/carrito';

interface IModel {
  get: (id?: string) => Promise<IItem | IItem[]>
  save: (id: string) => Promise<IItem>
  delete: (id: string) => Promise<IItem[]>
}

const models = [carritoModel];

export class CarritoModelFactory {
  public modelNumber: number;
  constructor(modelNumber: number) {
    this.modelNumber = modelNumber;
  }

  model(): IModel {
    return models[this.modelNumber];
  }
}