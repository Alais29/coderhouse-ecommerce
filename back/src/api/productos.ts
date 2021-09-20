import { IItem, IItemQuery } from 'common/interfaces';
import { ProductosModelFactory } from 'models/factory/productos';
import { modelTypeToUse } from './modelType';

class ProductsAPI {
  private factory;

  constructor() {
    this.factory = ProductosModelFactory.model(modelTypeToUse);
  }

  get(id?: string) {
    if (id) return this.factory.get(id);
    return this.factory.get();
  }

  async save(producto: IItem) {
    const newProduct = await this.factory.save(producto);
    return newProduct;
  }

  async update(id: string, producto: IItem) {
    const updatedProduct = await this.factory.update(id, producto);
    return updatedProduct;
  }

  async delete(id: string) {
    await this.factory.delete(id);
  }

  async query(options: IItemQuery) {
    if (this.factory.query) return this.factory.query(options);
  }
}

export const productsAPI = new ProductsAPI();
