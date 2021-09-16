import { IItem } from 'common/interfaces';
import { ProductosModel } from 'models/fs/producto';
import { ProductosModelMySql } from 'models/mysql/producto';
// import { ProductosModelSqlite } from 'models/sqlite/producto';

interface IModel {
  get: (id?: string) => Promise<IItem | IItem[]>
  save: (producto: IItem) => Promise<IItem>
  update: (id: string, producto: IItem) => Promise<IItem>
  delete: (id: string) => Promise<void>
}

export enum ModelType {
  fs = 1,
  mySql,
  sqlite,
  localMongo,
  mongoAtlas,
  firebase
}

export class ProductosModelFactory {
  static model(type: number): IModel {
    switch (type) {      
      case ModelType.mySql:
        return new ProductosModelMySql('mysql');
      
      case ModelType.sqlite:
        return new ProductosModelMySql('sqlite');

      default:
        return new ProductosModel();
    }
  }
}