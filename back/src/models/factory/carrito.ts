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

export class CarritoModelFactory {
  static model(type: number): IModel {
    switch (type) {
      case ModelType.fs:
        return new CarritoModelFs();

      case ModelType.mySql:
        return new CarritosModelMySql('mysql');

      case ModelType.sqlite:
        return new CarritosModelMySql('sqlite');

      case ModelType.localMongo:
        return new CarritoModelMongoDb('local');

      case ModelType.mongoAtlas:
        return new CarritoModelMongoDb('atlas');

      case ModelType.firebase:
        return new CarritoModelFirebase();

      default:
        return new CarritoModel();
    }
  }
}