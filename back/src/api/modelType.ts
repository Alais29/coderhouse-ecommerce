import { ModelType } from 'common/enums';
import Config from 'config';

const model = <keyof typeof ModelType>Config.PERSISTENCE;
export const modelTypeToUse = ModelType[model];
