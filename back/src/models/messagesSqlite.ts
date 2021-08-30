import { sqlLiteDbService } from 'services/sqlite';
import { IMesssage } from '../common/interfaces';

class MessagesModel {
  async get(): Promise<IMesssage[]> {
    try {
      return sqlLiteDbService.get('mensajes');
    } catch (e) {
      throw { error: e, message: 'Hubo un problema al cargar los mensajes' };
    }
  }

  async save(message: IMesssage): Promise<IMesssage> {
    try {
      const newMessage = await sqlLiteDbService.create('mensajes', message);
      return newMessage[0];
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
