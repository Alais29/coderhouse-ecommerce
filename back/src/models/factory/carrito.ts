import { ModelType } from 'common/enums';
import { IItem } from 'common/interfaces';
import { CarritoModelFirebase } from 'models/firebase/carrito';
import { CarritoModelFs } from 'models/fs/carrito';
import { CarritoModel } from 'models/memory/carrito';
import { CarritoModelMongoDb } from 'models/mongoDb/carrito';
import { CarritosModelMySql } from 'models/mysql/carrito';

interface IModel {
  get: (id?: string) => Promise<IItem | IItem[]>;
  save: (id: string) => Promise<IItem>;
  delete: (id: string) => Promise<IItem[]>;
}
interface IModelMongo {
  get: (userEmail: string, id?: string) => Promise<IItem | IItem[]>;
  save: (id: string, userEmail: string) => Promise<IItem>;
  delete: (id: string, userEmail: string) => Promise<IItem[]>;
}

type IModelType = IModel | IModelMongo;

export class CarritoModelFactory {
  static model(type: number): IModelType {
    switch (type) {
      case ModelType.fs:
        return new CarritoModelFs();

      case ModelType.mySql:
        return new CarritosModelMySql('mysql');

      case ModelType.sqlite:
        return new CarritosModelMySql('sqlite');

      case ModelType.localMongo:
      case ModelType.mongoAtlas:
        return new CarritoModelMongoDb();

      case ModelType.firebase:
        return new CarritoModelFirebase();

      default:
        return new CarritoModel();
    }
  }
}
