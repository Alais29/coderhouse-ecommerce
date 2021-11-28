import { IMessage } from 'common/interfaces/mensajes';
import mongoose from 'mongoose';

const mensajesCollection = 'mensajes';

const MensajeSchema = new mongoose.Schema<IMessage>(
  {
    user: {
      type: 'ObjectId',
      ref: 'User',
    },
    text: { type: String, require: true },
    type: { type: String, require: true },
  },
  {
    timestamps: {
      createdAt: 'date',
    },
  },
);

MensajeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const mensajesModel = mongoose.model<IMessage>(
  mensajesCollection,
  MensajeSchema,
);

class MensajesModelMongoDb {
  private mensajes;
  constructor() {
    this.mensajes = mensajesModel;
  }
  async get(userId: string): Promise<IMessage[]> {
    const userMessages = this.mensajes.find({ user: userId }).populate('user');
    return userMessages;
  }

  async save(
    userId: string,
    text: string,
    type: 'usuario' | 'sistema',
  ): Promise<IMessage> {
    const saveModel = new this.mensajes({
      user: userId,
      text,
      type,
    });
    return (await saveModel.save()).populate('user');
  }
}

export const mensajesModelMongoDb = new MensajesModelMongoDb();
