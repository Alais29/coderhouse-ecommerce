import { ModelType } from 'common/enums';
import { IOrder, IOrderBase } from 'common/interfaces/ordenes';
import { OrdenesModelMongoDb } from 'models/mongoDb/ordenes';

interface IModel {
  save: (userId: string, data: IOrderBase) => Promise<IOrder>;
  // get: (id?: string) => Promise<IUser | IUser[]>;
  // update: (id: string, userData: IUserBase) => Promise<IUser>;
  // delete: (id: string) => Promise<void>;
  // query: (email: string) => Promise<IUser>;
}

export class OrdenesModelFactory {
  static model(type: number): IModel {
    //TODO: agregar demás tipos de modelos (sql, firebase, etc)
    switch (type) {
      case ModelType.localMongo:
      case ModelType.mongoAtlas:
        return new OrdenesModelMongoDb();
      default:
        return new OrdenesModelMongoDb();
    }
  }
}
