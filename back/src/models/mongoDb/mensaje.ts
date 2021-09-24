import Config from 'config';
import { IMessage } from 'common/interfaces';
import mongoose from 'mongoose';
import moment from 'moment';

const mensajesCollection = 'mensajes';

const MensajeSchema = new mongoose.Schema<IMessage>(
  {
    author: {
      id: { type: String, require: true, max: 100 },
      nombre: { type: String, require: true, max: 30 },
      apellido: { type: String, require: true, max: 30 },
      edad: { type: Number, require: true, max: 99 },
      alias: { type: String, require: true, max: 20 },
      avatar: { type: String, require: true },
    },
    text: { type: String, require: true },
  },
  {
    timestamps: {
      createdAt: 'timestamp',
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
  private dbURL: string;
  private mensajes;
  constructor(type: 'local' | 'atlas') {
    this.mensajes = mensajesModel;
    if (type === 'local') {
      this.dbURL = 'mongodb://0.0.0.0:27017/ecommerce';
    } else {
      this.dbURL = `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DB}?retryWrites=true&w=majority`;
    }
    mongoose
      .connect(this.dbURL)
      .then(() => {
        console.log('Base de datos Mongo Mensajes conectada');
      })
      .catch(e => console.log(e));
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

export const mensajesModelMongoDb = new MensajesModelMongoDb('atlas');
