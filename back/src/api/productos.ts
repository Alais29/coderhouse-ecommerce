import { IItem } from 'common/interfaces';
import { ModelType, ProductosModelFactory } from 'models/factory/productos';

const type = ModelType.mongoAtlas;

class ProductsAPI {
  private factory;

  constructor() {
    this.factory = ProductosModelFactory.model(type);
  }

  async get(id?: string) {
    if (id) return await this.factory.get(id);
    return await this.factory.get();
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
}

export const productsAPI = new ProductsAPI();