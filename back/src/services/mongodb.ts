import mongoose from 'mongoose';
import Config from 'config';
import { ModelType } from 'common/enums';
import { modelTypeToUse } from 'api/modelType';
import { logger } from 'services/logger';

const getMongoUrl = (type: number): string => {
  switch (type) {
    case ModelType.localMongo:
      return 'mongodb://0.0.0.0:27017/ecommerce';
    default:
      return `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DB}?retryWrites=true&w=majority`;
  }
};

const mongoUrl = getMongoUrl(modelTypeToUse);

export const clientPromise = mongoose.connect(mongoUrl).then(m => {
  logger.info('Base de datos mongo conectada');
  return m.connection.getClient();
});
