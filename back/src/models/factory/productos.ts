import { ModelType } from 'common/enums';
import { IItem, IItemQuery } from 'common/interfaces/products';
import { ProductosModelFirebase } from 'models/firebase/producto';
import { ProductosModelFs } from 'models/fs/producto';
import { ProductosModel } from 'models/memory/productos';
import { ProductosModelMongoDb } from 'models/mongoDb/producto';
import { ProductosModelMySql } from 'models/mysql/producto';

interface IModel {
  get: (id?: string) => Promise<IItem | IItem[]>;
  getByCategory?: (category: string) => Promise<IItem[]>;
  save: (producto: IItem) => Promise<IItem>;
  update: (id: string, producto: IItem) => Promise<IItem>;
  delete: (id: string) => Promise<void>;
  query: (options: IItemQuery) => Promise<IItem | IItem[]>;
}

export class ProductosModelFactory {
  static model(type: number): IModel {
    switch (type) {
      case ModelType.fs:
        return new ProductosModelFs();

      case ModelType.mySql:
        return new ProductosModelMySql('mysql');

      case ModelType.sqlite:
        return new ProductosModelMySql('sqlite');

      case ModelType.localMongo:
      case ModelType.mongoAtlas:
        return new ProductosModelMongoDb();

      case ModelType.firebase:
        return new ProductosModelFirebase();

      default:
        return new ProductosModel();
    }
  }
}
