import { IOrderBase } from 'common/interfaces/ordenes';
import { OrdenesModelFactory } from 'models/factory/ordenes';
import { modelTypeToUse } from './modelType';

class OrdenesAPI {
  private factory;

  constructor() {
    this.factory = OrdenesModelFactory.model(modelTypeToUse);
  }

  async get(userId: string, orderId?: string) {
    if (orderId) return this.factory.get(userId, orderId);
    return this.factory.get(userId);
  }

  async save(userId: string, order: IOrderBase) {
    const newOrder = await this.factory.save(userId, order);
    return newOrder;
  }

  async update(orderId: string) {
    return this.factory.update(orderId);
  }
}

export const ordenesAPI = new OrdenesAPI();
