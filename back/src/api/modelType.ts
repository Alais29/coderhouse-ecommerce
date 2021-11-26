import { ModelType } from 'common/enums';
import Config from 'config';

const getModelType = () => {
  switch (Config.MODEL_PERSISTANCE) {
    case 'filesystem':
      return ModelType.fs;
    case 'mysql':
      return ModelType.mySql;
    case 'sqlite':
      return ModelType.sqlite;
    case 'localMongo':
      return ModelType.localMongo;
    case 'mongoAtlas':
      return ModelType.mongoAtlas;
    case 'firebase':
      return ModelType.firebase;
    default:
      return ModelType.memory;
  }
};

export const modelTypeToUse = getModelType();
