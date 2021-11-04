import 'dotenv/config.js';

const env = {
  PORT: process.env.PORT || 8080,
  MODE: process.env.MODE || 'noCluster',
  MONGO_ATLAS_USER: process.env.MONGO_ATLAS_USER || 'user',
  MONGO_ATLAS_PASSWORD: process.env.MONGO_ATLAS_PASSWORD || 'pasw',
  MONGO_ATLAS_CLUSTER: process.env.MONGO_ATLAS_CLUSTER || 'clusterUrl',
  MONGO_ATLAS_DB: process.env.MONGO_ATLAS_DB || 'clusterUrl',
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || 'firebaseProjectId',
  FIREBASE_CLIENT_EMAIL:
    process.env.FIREBASE_CLIENT_EMAIL || 'firebaseClientEmail',
  FIREBASE_PRIVATE_KEY:
    process.env.FIREBASE_PRIVATE_KEY || 'firebasePrivateKey',
  GMAIL_EMAIL: process.env.GMAIL_EMAIL || 'email@gmail.com',
  GMAIL_PASSWORD: process.env.GMAIL_PASSWORD || 'password',
  GMAIL_NAME: process.env.GMAIL_NAME || 'GMAIL owner name',
};

export default env;
