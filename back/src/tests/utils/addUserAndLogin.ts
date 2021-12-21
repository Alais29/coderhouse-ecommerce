import { UserModel } from 'models/mongoDb/user';
import { SuperAgentTest } from 'supertest';

export const addUserAndLogin = async (
  request: SuperAgentTest,
): Promise<void> => {
  await UserModel.create({
    email: 'test@test.com',
    password: 'secretPassword',
    repeatPassword: 'secretPassword',
    nombre: 'Test user',
    calle: 'Test street',
    altura: '123',
    codigoPostal: '123456789',
    edad: 31,
    telefono: '+56912345678',
    foto: 'uploads/test-image.jpg',
    fotoId: 'Products/b7ogvbaswljkwvo9gxle',
    admin: true,
  });

  await request
    .post('/api/auth/login')
    .send({
      email: 'test@test.com',
      password: 'secretPassword',
    })
    .then(res => {
      res.headers['set-cookie'][0]
        .split(/,(?=\S)/)
        .map((item: string) => item.split(';')[0])
        .join(';');
    });
};
