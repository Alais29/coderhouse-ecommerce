import MongoMemoryServer from 'mongodb-memory-server-core';

declare global {
  namespace NodeJS {
    interface Global {
      __MONGOINSTANCE__: MongoMemoryServer;
    }
  }
}
