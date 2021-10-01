import mongoose from 'mongoose';
import Config from 'config';
import { ModelType } from 'common/enums';
import { modelTypeToUse } from 'api/modelType';

const getMongoUrl = (type: number): string => {
  let mongoUrl = '';
  switch (type) {
    case ModelType.localMongo:
      mongoUrl = 'mongodb://0.0.0.0:27017/ecommerce';
      break;
    default:
      mongoUrl = `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DB}?retryWrites=true&w=majority`;
      break;
  }
  return mongoUrl;
};

const mongoUrl = getMongoUrl(modelTypeToUse);

export const clientPromise = mongoose.connect(mongoUrl).then(m => {
  console.log('Base de datos mongo conectada');
  return m.connection.getClient();
});
