import Server from 'services/server';
import supertest, { SuperTest, Test } from 'supertest';
import MongoMemoryServer from 'mongodb-memory-server-core';

describe('Productos api test', () => {
  let request: SuperTest<Test>;

  beforeAll(() => {
    request = supertest(Server);
  });

  afterAll(async () => {
    const instance: MongoMemoryServer = global.__MONGOINSTANCE__;
    Server.close();
    await instance.stop();
  });

  it('should sum 2 + 2 and equal 4', () => {
    const a = 2;
    const b = 2;

    const expectedResult = 4;
    const result = a + b;

    expect(result).toEqual(expectedResult);
  });

  it('should return an empty array if there are no products', async () => {
    const response = await request.get('/api/productos');
    expect(response.status).toBe(404);
  });
});
