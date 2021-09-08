import mongoose from 'mongoose';

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

export const mongoDbService = new MongoDb();