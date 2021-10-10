import args from 'args';

const options = [
  {
    name: 'port',
    description: 'The port on which the app runs',
  },
  {
    name: 'faceId',
    description: 'Facebook app ID',
  },
  {
    name: 'faceSecret',
    description: 'Facebook app secret',
  },
];

args.options(options);

const flags = args.parse(process.argv);
const env = {
  PORT: flags.port || process.env.PORT || 8080,
  MONGO_ATLAS_USER: process.env.MONGO_ATLAS_USER || 'user',
  MONGO_ATLAS_PASSWORD: process.env.MONGO_ATLAS_PASSWORD || 'pasw',
  MONGO_ATLAS_CLUSTER: process.env.MONGO_ATLAS_CLUSTER || 'clusterUrl',
  MONGO_ATLAS_DB: process.env.MONGO_ATLAS_DB || 'clusterUrl',
  FACEBOOK_APP_ID: flags.faceId || process.env.FACEBOOK_APP_ID || 'faceId',
  FACEBOOK_APP_SECRET:
    flags.faceSecret || process.env.FACEBOOK_APP_SECRET || 'faceSecret',
};

console.log('ID del proceso =>', process.pid);

export default env;
