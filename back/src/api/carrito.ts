import { CarritoModelFactory } from 'models/factory/carrito';
import { modelTypeToUse } from './modelType';

class CarritoAPI {
  private factory;

  constructor() {
    this.factory = CarritoModelFactory.model(modelTypeToUse);
  }

  get(userEmail: string, id?: string) {
    if (id) return this.factory.get(userEmail, id);
    return this.factory.get(userEmail);
  }

  async save(id: string, userEmail: string) {
    const newProduct = await this.factory.save(id, userEmail);
    return newProduct;
  }

  delete(id: string, userEmail: string) {
    return this.factory.delete(id, userEmail);
  }
}

export const carritoAPI = new CarritoAPI();
