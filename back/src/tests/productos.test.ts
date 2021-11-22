import Server from 'services/server';
import supertest, { SuperAgentTest } from 'supertest';
import MongoMemoryServer from 'mongodb-memory-server-core';
import mongoose from 'mongoose';
import { IItem } from 'common/interfaces/products';
import { addProductsMockDb } from './utils/addProductsMockDb';
import { addUserAndLogin } from './utils/addUserAndLogin';
import { loggedInRequest } from './utils/loggedInRequest';

describe('Productos api tests', () => {
  let request: SuperAgentTest;

  beforeAll(async () => {
    request = supertest.agent(Server);
    await addProductsMockDb();
    await addUserAndLogin(request);
  });

  afterAll(async () => {
    const instance: MongoMemoryServer = global.__MONGOINSTANCE__;
    Server.close();
    await instance.stop();
    await mongoose.disconnect();
  });

  it('GET: should return a list of products, 200 status code', async () => {
    const response = await loggedInRequest(request, 'get', '/api/productos');
    const productsArray = response.body.data;

    expect(productsArray.length).not.toBe(0);
    expect(response.status).toBe(200);
  });

  it('GET: should return a product by its id, 200 status code', async () => {
    const response = await loggedInRequest(request, 'get', '/api/productos');
    const expectedProductId = response.body.data[0].id;
    const productResponse = await loggedInRequest(
      request,
      'get',
      `/api/productos/${expectedProductId}`,
    );
    const productId = productResponse.body.data.id;

    expect(productResponse.statusCode).toBe(200);
    expect(expectedProductId).toEqual(productId);
  });

  it('POST: should add a product and return it, 200 status code', async () => {
    const mockProduct = {
      nombre: 'Test product',
      descripcion:
        'Lorem ipsum dolor sit amet, nam fierent perfecto ea, pro in albucius oportere accommodare.',
      codigo: 'ECOM-1234-1234',
      precio: 123.8,
      foto: 'https://picsum.photos/300?random=2',
      stock: 44,
    };
    const response = await loggedInRequest(
      request,
      'post',
      '/api/productos',
      mockProduct,
    );

    const products = (await loggedInRequest(request, 'get', '/api/productos'))
      .body.data;

    const productAddedToDb = products.find(
      (item: IItem) => item.nombre === 'Test product',
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.data.nombre).toEqual('Test product');
    expect(productAddedToDb.nombre).toEqual('Test product');
  });

  it('PUT: should edit a product and return it, 200 status code', async () => {
    const productsResponse = await loggedInRequest(
      request,
      'get',
      '/api/productos',
    );
    const productToEdit = productsResponse.body.data[0];

    const newProductData = {
      ...productToEdit,
      nombre: 'Put Test',
    };

    const putResponse = await loggedInRequest(
      request,
      'put',
      `/api/productos/${productToEdit.id}`,
      newProductData,
    );
    const editedProduct = putResponse.body.data;

    const productEditedInDb = (
      await loggedInRequest(
        request,
        'get',
        `/api/productos/${productToEdit.id}`,
      )
    ).body.data;

    expect(putResponse.statusCode).toBe(200);
    expect(editedProduct.nombre).toEqual('Put Test');
    expect(productEditedInDb.nombre).toEqual('Put Test');
  });

  it('DELETE: should delete a product by its id, 200 status code', async () => {
    const productsResponse = await loggedInRequest(
      request,
      'get',
      '/api/productos',
    );
    const productToDelete = productsResponse.body.data[0];

    const deleteResponse = await loggedInRequest(
      request,
      'delete',
      `/api/productos/${productToDelete.id}`,
    );

    const productsAfterDelete = (
      await loggedInRequest(request, 'get', '/api/productos')
    ).body.data;
    const productDeleted = productsAfterDelete.find(
      (item: IItem) => item.id === productToDelete.id,
    );

    expect(productsResponse.statusCode).toBe(200);
    expect(deleteResponse.body.data).toBe('Producto eliminado');
    expect(productDeleted).toBeUndefined();
  });
});
