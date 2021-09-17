import { ModelType } from 'common/enums';
import { IItem } from 'common/interfaces';
import { CarritoModel } from 'models/fs/carrito';
import { CarritoModelMongoDb } from 'models/mongoDb/carrito';
import { CarritosModelMySql } from 'models/mysql/carrito';

interface IModel {
  get: (id?: string) => Promise<IItem | IItem[]>
  save: (id: string) => Promise<IItem>
  delete: (id: string) => Promise<IItem[]>
}

export class CarritoModelFactory {
  static model(type: number): IModel {
    switch (type) {
      case ModelType.mySql:
        return new CarritosModelMySql('mysql');
      
      case ModelType.sqlite:
        return new CarritosModelMySql('sqlite');
      
      case ModelType.localMongo:
        return new CarritoModelMongoDb('local');
      
      case ModelType.mongoAtlas:
        return new CarritoModelMongoDb('atlas');
      
      default:
        return new CarritoModel();
    }
  }
}