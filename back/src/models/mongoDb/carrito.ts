import Config from 'config';
import { IItem, IItemBase } from 'common/interfaces';
import moment from 'moment';
import mongoose from 'mongoose';
import { NotFound, RepeatedProductInCart } from 'errors';
import { productosModel } from 'models/mongoDb/producto';

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
  },
});

export class CarritoModelMongoDb {
  private dbURL: string;
  private carrito;
  private productos;
  constructor(type: 'local' | 'atlas') {
    this.carrito = mongoose.model<IItemBase>('carrito', ProductoSchema);
    this.productos = productosModel;
    if (type === 'local') {
      this.dbURL = 'mongodb://0.0.0.0:27017/ecommerce';
    } else {
      this.dbURL = `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DB}?retryWrites=true&w=majority`;
    }
    mongoose
      .connect(this.dbURL)
      .then(() => console.log('Base de datos Mongo conectada'))
      .catch((e) => console.log(e));
  }

  async get(id?: string): Promise<IItem[] | IItem> {
    try {
      let output: IItem[] | IItem = [];
      if (id) {
        const document = await this.carrito.findById(id);
        if (document) output = document as unknown as IItem;
        else throw new NotFound(404, 'El producto no está en el carrito');
      } else {
        const products = await this.carrito.find();
        output = products as unknown as IItem[];
      }
      return output;
    } catch (e) {
      if (e instanceof NotFound) {
        throw e;
      } else if (e instanceof mongoose.Error.CastError) {
        throw new NotFound(404, 'El producto no está en el carrito');
      } else {
        throw { error: e, message: 'Hubo un problema al cargar los productos' };
      }
    }
  }

  async save(id: string): Promise<IItem> {
    try {
      const productsInCart = await this.get();
      const productToAddInCart = (productsInCart as IItem[]).find(
        (item) => item.id === id
      );

      if (productToAddInCart) {
        throw new RepeatedProductInCart(
          400,
          'El producto que desea agregar ya se encuentra en el carrito'
        );
      } else {
        const productToAdd = await this.productos.findById(id);
        if (productToAdd) {
          const productJSON = productToAdd.toJSON();
          productJSON._id = productJSON.id;
          delete productJSON.id;

          const newProduct = await new this.carrito(productJSON as IItem);
          await newProduct.save();
          return newProduct as IItem;
        } else {
          throw new NotFound(404, 'El producto que deseas agregar no existe');
        }
      }
    } catch (e) {
      if (e instanceof RepeatedProductInCart || e instanceof NotFound) {
        throw e;
      } else if (e instanceof mongoose.Error.CastError) {
        throw new NotFound(404, 'El producto que deseas agregar no existe');
      } else {
        throw { error: e, message: 'No se pudo agregar el producto' };
      }
    }
  }

  async delete(id: string): Promise<IItem[]> {
    try {
      await this.carrito.findByIdAndRemove(id);
      const carritoProducts = await this.get();
      return carritoProducts as IItem[];
    } catch (e) {
      if (e instanceof mongoose.Error.CastError) {
        throw new NotFound(
          404,
          'El producto que desea eliminar no está en el carrito'
        );
      } else {
        throw { error: e, message: 'Hubo un problema al eliminar el producto' };
      }
    }
  }
}
