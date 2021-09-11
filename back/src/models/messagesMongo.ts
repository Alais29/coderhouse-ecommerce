import { mongoDbServiceMensajes } from 'services/mongodb';
import { IMesssage, IMesssageDoc } from '../common/interfaces';

class MessagesModel {
  async get(): Promise<IMesssageDoc[]> {
    try {
      return mongoDbServiceMensajes.get();
    } catch (e) {
      throw { error: e, message: 'Hubo un problema al cargar los mensajes' };
    }
  }

  async save(message: IMesssage): Promise<IMesssageDoc> {
    try {
      const newMessage = await mongoDbServiceMensajes.create(message);
      return newMessage;
    } catch (e) {
      if (e.code) {
        throw { error: e, message: 'No se pudo guardar el mensaje' };
      } else {
        throw Error(e.message);
      }
    }
  }
}

export const messagesModel = new MessagesModel();
