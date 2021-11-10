import { ModelType } from 'common/enums';
import { IUser, IUserBase } from 'common/interfaces/users';
import { UserModelMongoDb } from 'models/mongoDb/user';

interface IModel {
  get: (id?: string) => Promise<IUser | IUser[]>;
  save: (userData: IUserBase) => Promise<IUser>;
  update: (id: string, userData: IUserBase) => Promise<IUser>;
  delete: (id: string) => Promise<void>;
  query: (email: string) => Promise<IUser>;
}

export class UserModelFactory {
  static model(type: number): IModel {
    //TODO: agregar demás tipos de modelos (sql, firebase, etc)
    switch (type) {
      case ModelType.localMongo:
      case ModelType.mongoAtlas:
        return new UserModelMongoDb();
      default:
        return new UserModelMongoDb();
    }
  }
}
