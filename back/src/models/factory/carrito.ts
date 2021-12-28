import { ModelType } from 'common/enums';
import { IItemCarrito } from 'common/interfaces/carrito';
import { IItem } from 'common/interfaces/products';
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
export interface IModelCarritoMongo {
  get: (
    userId: string,
    productId?: string,
  ) => Promise<IItemCarrito | IItemCarrito[]>;
  save: (userId: string, productId: string) => Promise<IItemCarrito[]>;
  update: (
    userId: string,
    productId: string,
    amount: number,
  ) => Promise<IItemCarrito[]>;
  delete: (userId: string, productId?: string) => Promise<IItemCarrito[]>;
}

export type IModelType = IModel | IModelCarritoMongo;

export class CarritoModelFactory {
  static model(type: number): IModelType {
    //TODO: Add individual cart for user to fs, sql, memory and firebase models
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
