import { IMessage } from 'common/interfaces/mensajes';
import { mensajesModelMongoDb } from 'models/mongoDb/mensajes';

class MessagesAPI {
  get(id?: string): Promise<IMessage | IMessage[]> {
    if (id) return mensajesModelMongoDb.get(id);
    return mensajesModelMongoDb.get();
  }

  async save(data: IMessage) {
    const newMessage = await mensajesModelMongoDb.save(data);
    return newMessage;
  }
}

export const messagesAPI = new MessagesAPI();
