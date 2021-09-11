import mongoose from 'mongoose';
import { Producto, Mensaje } from 'models/schemas';
import { IItem, IItemMongoDoc, IMesssage, IMesssageDoc } from 'common/interfaces';
class MongoDb {
  private dbURL: string;
  constructor() {
    this.dbURL = 'mongodb://0.0.0.0:27017/ecommerce';
  }

  async init() {
    try {
      await mongoose.connect(this.dbURL);
      console.log('Base de datos Mongo conectada');
    } catch (e) {
      console.log(e);
    } 
  }
}

class MongoProductos {
  async get(id?: string): Promise<IItemMongoDoc[] > {
    if (id) return await Producto.find({ _id: id });
    return await Producto.find({});
  }

  async create(data: IItem): Promise<IItemMongoDoc> {
    const saveModel = await new Producto(data);
    return await saveModel.save();
  }

  async update(id: string, data: IItem): Promise<IItemMongoDoc> {
    const productUpdated = await Producto.findByIdAndUpdate(id, data, { new: true, runValidators: true, rawResult: true });
    return productUpdated.value;
  }

  async delete(id: string) {
    return await Producto.findByIdAndRemove(id);
  }
}

class MongoMensajes {
  async get(id?: string): Promise<IMesssageDoc[]> {
    if (id) return await Mensaje.find({ _id: id });
    return await Mensaje.find({});
  }

  async create(data: IMesssage): Promise<IMesssageDoc> {
    const saveModel = await new Mensaje(data);
    return await saveModel.save();
  }
}

export const mongoDbService = new MongoDb();
export const mongoDbServiceProductos = new MongoProductos();
export const mongoDbServiceMensajes = new MongoMensajes();