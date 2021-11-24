import { IMessage } from 'common/interfaces/mensajes';
import mongoose from 'mongoose';

const mensajesCollection = 'mensajes';

const MensajeSchema = new mongoose.Schema<IMessage>(
  {
    email: { type: String, require: true },
    text: { type: String, require: true },
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
  async get(id?: string): Promise<IMessage[]> {
    if (id) return this.mensajes.find({ _id: id });
    return this.mensajes.find({});
  }

  async save(data: IMessage): Promise<IMessage> {
    const saveModel = new this.mensajes(data);
    return saveModel.save();
  }
}

export const mensajesModelMongoDb = new MensajesModelMongoDb();
