import { CarritoModelFactory } from 'models/factory/carrito';
import { modelTypeToUse } from './modelType';

class CarritoAPI {
  private factory;

  constructor() {
    this.factory = CarritoModelFactory.model(modelTypeToUse);
  }

  get(id?: string) {
    if (id) return this.factory.get(id);
    return this.factory.get();
  }

  async save(id: string) {
    const newProduct = await this.factory.save(id);
    return newProduct;
  }

  delete(id: string) {
    return this.factory.delete(id);
  }
}

export const carritoAPI = new CarritoAPI();
