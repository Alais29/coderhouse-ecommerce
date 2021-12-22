import supertest, { SuperAgentTest } from 'supertest';
import MongoMemoryServer from 'mongodb-memory-server-core';
import mongoose from 'mongoose';
import Server from 'services/server';
import { addUserAndLogin } from '../utils/addUserAndLogin';
import { mockProduct1, mockProduct2, mockProduct3 } from './mockProducts';

describe('Productos api errors tests', () => {
  let request: SuperAgentTest;

  beforeAll(async () => {
    request = supertest.agent(Server);
    await addUserAndLogin(request);
  });

  afterAll(async () => {
    const instance: MongoMemoryServer = global.__MONGOINSTANCE__;
    Server.close();
    await instance.stop();
    await mongoose.disconnect();
  });

  it('GET: should return a proper error message if there are no products, 404 status code', async () => {
    const response = await request.get('/api/productos');

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('No hay productos');
  });

  it('GET: should return a proper error message if a product searched by id does not exists, 404 status code', async () => {
    const response = await request.get(
      `/api/productos/619bfea7e2bf96923aa7041a`,
    );

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('Producto no encontrado');
  });

  it('POST: should return a proper error message if incorrect values are passed, 400 status code', async () => {
    const response2 = await request.post('/api/productos').send(mockProduct2);
    const response3 = await request.post('/api/productos').send(mockProduct3);

    expect(response2.status).toBe(400);
    expect(response2.body.name).toEqual('ProductValidation');
    expect(response3.status).toBe(400);
    expect(response3.body.name).toEqual('MissingFieldsProduct');
  });

  it('PUT: should return a proper error message if incorrect values are passed, 400 status code', async () => {
    const response = await request
      .post('/api/productos')
      .field('nombre', mockProduct1.nombre)
      .field('descripcion', mockProduct1.descripcion)
      .field('codigo', mockProduct1.codigo)
      .field('categoria', mockProduct1.categoria)
      .field('precio', mockProduct1.precio)
      .field('stock', mockProduct1.stock)
      .attach('fotos', `${__dirname}/test-product-image.jpg`);
    const productToEdit = response.body.data;

    const editedProduct = {
      ...productToEdit,
      descripcion:
        'Lorem ipsum dolor sit amet, nam fierent perfecto ea, pro in albucius oportere accommodare. Ius everti consectetuer et, meis mutat. Lorem ipsum dolor sit amet, nam fierent perfecto ea, pro in albucius oportere accommodare. Lorem ipsum dolor sit amet, nam fierent perfecto ea, pro in albucius oportere accommodare. Lorem ipsum dolor sit amet, nam fierent perfecto ea, pro in albucius oportere accommodare. Lorem ipsum dolor sit amet, nam fierent perfecto ea, pro in albucius oportere accommodare. Lorem ipsum dolor sit amet, nam fierent perfecto ea, pro in albucius oportere accommodare.',
    };

    const putResponse = await request
      .put(`/api/productos/${productToEdit.id}`)
      .field('nombre', editedProduct.nombre)
      .field('descripcion', editedProduct.descripcion)
      .field('codigo', editedProduct.codigo)
      .field('categoria', editedProduct.categoria)
      .field('precio', editedProduct.precio)
      .field('stock', editedProduct.stock)
      .field('fotos', JSON.stringify(editedProduct.fotos))
      .field('fotosId', JSON.stringify(editedProduct.fotosId))
      .attach('newFotos', `${__dirname}/test-product-image.jpg`)
      .attach('newFotos', `${__dirname}/test-product-image.jpg`);

    expect(putResponse.status).toBe(400);
    expect(putResponse.body.name).toEqual('ProductValidation');
  });

  it('PUT: should return a proper error message if the product to edit does not exists', async () => {
    const editedProduct = {
      ...mockProduct1,
      nombre: 'Put Edit',
      fotosId: ['public id'],
    };

    const putResponse = await request
      .put('/api/productos/mockMongoId')
      .field('nombre', editedProduct.nombre)
      .field('descripcion', editedProduct.descripcion)
      .field('codigo', editedProduct.codigo)
      .field('categoria', editedProduct.categoria)
      .field('precio', editedProduct.precio)
      .field('stock', editedProduct.stock)
      .field('fotos', JSON.stringify(editedProduct.fotos))
      .field('fotosId', JSON.stringify(editedProduct.fotosId));

    expect(putResponse.status).toBe(404);
    expect(putResponse.body.name).toEqual('NotFound');
    expect(putResponse.body.message).toEqual(
      'El producto que desea actualizar no existe',
    );
  });

  it('DELETE: should return a proper error message if the product to delete does not exis', async () => {
    const deleteResponse = await request.delete('/api/productos/mockMongoId');

    expect(deleteResponse.status).toBe(404);
    expect(deleteResponse.body.name).toEqual('NotFound');
    expect(deleteResponse.body.message).toEqual(
      'El producto que desea eliminar no existe',
    );
  });
});
