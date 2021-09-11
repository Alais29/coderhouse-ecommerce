import { IItemBase, IMesssage } from 'common/interfaces';
import moment from 'moment';
import mongoose from 'mongoose';

const productosCollection = 'productos';
const mensajesCollection = 'mensajes';

const ProductoSchema = new mongoose.Schema<IItemBase>({
  nombre: { type: String, require: true, max: 100 },
  descripcion: { type: String, require: true, max: 500 },
  codigo: { type: String, require: true, max: 14 },
  precio: { type: Number, require: true, max: 5000 },
  foto: { type: String, require: true },
  timestamp: { type: String, default: moment().format('DD/MM/YYYY HH:mm:ss') },
  stock: { type: Number, default: 0 },
});

ProductoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const MensajeSchema = new mongoose.Schema<IMesssage>({
  email: { type: String, require: true, max: 100 },
  text: { type: String, require: true },
  date: { type: String, default: moment().format('DD/MM/YYYY HH:mm:ss') },
});

MensajeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export const Producto = mongoose.model<IItemBase>(productosCollection, ProductoSchema);
export const Mensaje = mongoose.model<IMesssage>(mensajesCollection, MensajeSchema);