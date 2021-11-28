import { IMessage } from 'common/interfaces/mensajes';
import { mensajesModelMongoDb } from 'models/mongoDb/mensajes';

class MessagesAPI {
  get(userId: string): Promise<IMessage[]> {
    return mensajesModelMongoDb.get(userId);
  }

  async save(userId: string, text: string, type: 'usuario' | 'sistema') {
    const newMessage = await mensajesModelMongoDb.save(userId, text, type);
    return newMessage;
  }
}

export const messagesAPI = new MessagesAPI();
