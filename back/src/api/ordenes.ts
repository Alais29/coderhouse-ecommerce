import { IOrderBase } from 'common/interfaces/ordenes';
import { OrdenesModelFactory } from 'models/factory/ordenes';
import { modelTypeToUse } from './modelType';

class OrdenesAPI {
  private factory;

  constructor() {
    this.factory = OrdenesModelFactory.model(modelTypeToUse);
  }

  async save(userId: string, order: IOrderBase) {
    const newOrder = await this.factory.save(userId, order);
    return newOrder;
  }
}

export const ordenesAPI = new OrdenesAPI();
