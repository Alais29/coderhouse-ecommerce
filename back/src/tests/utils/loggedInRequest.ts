import { IObject } from 'common/interfaces/others';
import { Response, SuperAgentTest } from 'supertest';
import { session } from './addUserAndLogin';

export const loggedInRequest = async (
  request: SuperAgentTest,
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: IObject,
): Promise<Response> => {
  if ((method === 'post' || method === 'put') && data) {
    const response = await request[method](url)
      .send(data)
      .set('Cookie', session);
    return response;
  } else {
    const response = request[method](url).set('Cookie', session);
    return response;
  }
};
