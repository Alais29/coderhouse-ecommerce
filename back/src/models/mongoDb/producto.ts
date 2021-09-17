import Config from 'config';
import { IItem, IItemBase } from 'common/interfaces';
import moment from 'moment';
import mongoose from 'mongoose';
import { productosMock } from 'mocks/products';
import { NotFound } from 'errors';

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

export class ProductosModelMongoDb {
  private dbURL: string;
  private productos;
  constructor(type: 'local' | 'atlas') {
    this.productos = mongoose.model<IItemBase>('productos', ProductoSchema);
    if (type === 'local') {
      this.dbURL = 'mongodb://0.0.0.0:27017/ecommerce';
    } else {
      this.dbURL = `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DB}?retryWrites=true&w=majority`;
    }
    mongoose.connect(this.dbURL)
      .then(() => {
        console.log('Base de datos Mongo conectada');
        this.get()
          .then((productos) => {
            if (productos.length === 0) {
              this.productos.insertMany(productosMock)
                .then(() => console.log('Productos agregados'))
                .catch((e) => console.log(e));
            }
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  }

  async get(id?: string): Promise<IItem[] | IItem> {
    try {
      let output: IItem[] | IItem = [];
      if (id) {
        const document = await this.productos.findById(id);
        if (document) output = ((document as unknown) as IItem);
      } else {
        const products = await this.productos.find();
        output = (products as unknown) as IItem[];
      }
      return output;
    } catch (e) {
      if (e instanceof mongoose.Error.CastError) {
        throw new NotFound('Producto no encontrado');
      } else {
        throw { error: e, message: 'Hubo un problema al cargar los productos' };
      }
    }
  }

  async save(data: IItem): Promise<IItem> {
    const newProduct = await new this.productos(data);
    await newProduct.save();
    return (newProduct as unknown) as IItem;
  }

  async update(id: string, data: IItem): Promise<IItem> {
    try {
      const productUpdated = await this.productos.findByIdAndUpdate(id, data, { new: true, runValidators: true, rawResult: true });
      return (productUpdated.value as unknown) as IItem;
    } catch (e) {
      if (e instanceof mongoose.Error.CastError) {
        throw new NotFound('El producto que desea actualizar no existe');
      } else {
        throw { error: e, message: 'Hubo un problema al cargar los productos' };
      }
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.productos.findByIdAndRemove(id);
    } catch (e) {
      if (e instanceof mongoose.Error.CastError) {
        throw new NotFound('El producto que desea eliminar no existe');
      } else {
        throw { error: e, message: 'Hubo un problema al cargar los productos' };
      }
    }
  }
}