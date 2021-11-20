import { ModelType } from 'common/enums';
import { IItem, IItemQuery } from 'common/interfaces/products';
import { ProductosModelFirebase } from 'models/firebase/producto';
import { ProductosModelFs } from 'models/fs/producto';
import { ProductosModel } from 'models/memory/productos';
import { ProductosModelMongoDb } from 'models/mongoDb/producto';
import { ProductosModelMySql } from 'models/mysql/producto';

export interface IModel {
  get: (id?: string) => Promise<IItem | IItem[]>;
  save: (producto: IItem) => Promise<IItem>;
  update: (id: string, producto: IItem) => Promise<IItem>;
  delete: (id: string) => Promise<void>;
  query: (options: IItemQuery) => Promise<IItem | IItem[]>;
}

export class ProductosModelFactory {
  private static instance: IModel;
  private static value: number;

  static model(type: number): IModel {
    switch (type) {
      case ModelType.fs:
        if (!this.instance) this.instance = new ProductosModelFs();
        if (!this.value) this.value = Math.random();
        console.log(this.value);
        return this.instance;

      case ModelType.mySql:
        if (!this.instance) this.instance = new ProductosModelMySql('mysql');
        if (!this.value) this.value = Math.random();
        console.log(this.value);
        return this.instance;

      case ModelType.sqlite:
        if (!this.instance)
          this.instance = this.instance = new ProductosModelMySql('sqlite');
        if (!this.value) this.value = Math.random();
        console.log(this.value);
        return this.instance;

      case ModelType.localMongo:
      case ModelType.mongoAtlas:
        if (!this.instance)
          this.instance = this.instance = new ProductosModelMongoDb();
        if (!this.value) this.value = Math.random();
        console.log(this.value);
        return this.instance;

      case ModelType.firebase:
        if (!this.instance)
          this.instance = this.instance = new ProductosModelFirebase();
        if (!this.value) this.value = Math.random();
        console.log(this.value);
        return this.instance;

      default:
        if (!this.instance)
          this.instance = this.instance = new ProductosModel();
        if (!this.value) this.value = Math.random();
        console.log(this.value);
        return this.instance;
    }
  }
}

ProductosModelFactory.model(ModelType.memory);
ProductosModelFactory.model(ModelType.memory);
