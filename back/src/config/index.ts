import dotenv from 'dotenv';
import path from 'path';
import minimist from 'minimist';

dotenv.config({
  path: path.resolve(`${process.env.NODE_ENV}.env`),
});

const args = minimist(process.argv.slice(2), {
  alias: {
    p: 'port',
  },
});

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  MODEL_PERSISTANCE: process.env.MODEL_PERSISTANCE || 'memory',
  PORT: args.p || 8080,
  MODE: process.env.MODE || 'noCluster',
  SESSION_SECRET: process.env.SESSION_SECRET || 'sessionSecret',
  SESSION_COOKIE_TIMEOUT_MIN: parseInt(
    process.env.SESSION_COOKIE_TIMEOUT_MIN || '10',
  ),
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
  TWILIO_ACCOUNT_ID: process.env.TWILIO_ACCOUNT_ID || 'twilioId',
  TWILIO_TOKEN: process.env.TWILIO_TOKEN || 'twilioToken',
  TWILIO_CELLPHONE: process.env.TWILIO_CELLPHONE || '+123456789',
  TWILIO_CELLPHONE_WHATSAPP:
    process.env.TWILIO_CELLPHONE_WHATSAPP || '+123456789',
  ADMIN_WHATSAPP: process.env.ADMIN_WHATSAPP || '+123456789',
};

export default env;
