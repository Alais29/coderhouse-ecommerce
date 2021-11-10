import { UserNotExists } from 'errors';
import { CarritoModelFactory } from 'models/factory/carrito';
import { CarritoModelMongoDb } from 'models/mongoDb/carrito';
import { userAPI } from './user';
import { modelTypeToUse } from './modelType';

class CarritoAPI {
  private factory;

  constructor() {
    this.factory = CarritoModelFactory.model(modelTypeToUse);
  }

  async createCart(userId: string) {
    const user = await userAPI.getUsers(userId);

    if (!user)
      throw new UserNotExists(
        400,
        'Ocurrió un error al crear el carrito, el usuario no existe',
      );

    if (this.factory instanceof CarritoModelMongoDb) {
      const newCart = await this.factory.createCart(userId);
      return newCart;
    } else {
      throw new Error('No se pudo crear el carrito');
    }
  }

  get(userId: string, productId?: string) {
    if (productId) return this.factory.get(userId, productId);
    return this.factory.get(userId);
  }

  async save(userId: string, productId: string) {
    const newProduct = await this.factory.save(userId, productId);
    return newProduct;
  }

  async update(userId: string, productId: string, amount: number) {
    if (this.factory instanceof CarritoModelMongoDb) {
      const updatedCart = await this.factory.update(userId, productId, amount);
      return updatedCart;
    } else {
      throw new Error('No se puedo crear el carrito');
    }
  }

  delete(userId: string, productId?: string) {
    if (productId) return this.factory.delete(userId, productId);
    return this.factory.delete(userId);
  }
}

export const carritoAPI = new CarritoAPI();
