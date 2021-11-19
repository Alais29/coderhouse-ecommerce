import mongoose from 'mongoose';
import Config from 'config';
import { ModelType } from 'common/enums';
import { modelTypeToUse } from 'api/modelType';
import { logger } from 'services/logger';
import MongoMemoryServer from 'mongodb-memory-server-core';
import { MongoClient } from 'mongodb';

export interface Global extends NodeJS.Global {
  __MONGOINSTANCE__: MongoMemoryServer;
}

declare const global: Global;

const mongoTestServer = async () => {
  const instance = await MongoMemoryServer.create();
  const uri = instance.getUri();
  global.__MONGOINSTANCE__ = instance;
  return uri.slice(0, uri.lastIndexOf('/'));
};

const getMongoUrl = async (type: number): Promise<string> => {
  if (Config.NODE_ENV === 'test') {
    const mongoserver = await mongoTestServer();
    return `${mongoserver}/${Config.MONGO_ATLAS_DB}`;
  }
  switch (type) {
    case ModelType.localMongo:
      return 'mongodb://0.0.0.0:27017/ecommerce';
    default:
      return `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DB}?retryWrites=true&w=majority`;
  }
};

export const clientPromise = async (): Promise<MongoClient> => {
  const mongoUrl = await getMongoUrl(modelTypeToUse);
  return mongoose.connect(mongoUrl).then(m => {
    logger.info('Base de datos mongo conectada');
    return m.connection.getClient();
  });
};
