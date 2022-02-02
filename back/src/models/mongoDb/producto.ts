import { IItem, IItemBase, IItemQuery } from 'common/interfaces/products';
import moment from 'moment';
import mongoose, { FilterQuery } from 'mongoose';
import { NotFound, ProductValidation } from 'errors';
import uniqueValidator from 'mongoose-unique-validator';
import { CarritoModel } from './carrito';
import { isQueryValid } from 'utils/validations';

const ProductoSchema = new mongoose.Schema<IItemBase>({
  nombre: {
    type: String,
    require: true,
    maxLength: [100, 'El nombre debe tener un máximo de 100 caracteres'],
  },
  descripcion: {
    type: String,
    require: true,
    maxLength: [500, 'La descripción debe tener un máximo de 500 caracteres'],
  },
  codigo: {
    type: String,
    require: true,
    maxLength: [14, 'El código debe tener un máximo de 14 caracteres'],
    unique: true,
  },
  precio: {
    type: Number,
    require: true,
    max: [5000, 'El precio no puede ser mayor a 5000'],
  },
  categoria: {
    type: String,
    require: true,
    maxLength: [20, 'La categoría debe tener un máximo de 20 caracteres'],
  },
  fotos: { type: [String], require: true },
  fotosId: { type: [String], require: true },
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

ProductoSchema.plugin(uniqueValidator, {
  message: 'El código ya existe, ingrese uno diferente.',
});

export const ProductosModel = mongoose.model<IItemBase>(
  'Producto',
  ProductoSchema,
);

export class ProductosModelMongoDb {
  private productos;
  private carritoModel;
  constructor() {
    this.productos = ProductosModel;
    this.carritoModel = CarritoModel;
  }

  async get(id?: string): Promise<IItem[] | IItem> {
    try {
      let output: IItem[] | IItem = [];
      if (id) {
        const document = await this.productos.findById(id);
        if (document) output = document as unknown as IItem;
      } else {
        const products = await this.productos.find();
        output = products as unknown as IItem[];
      }
      return output;
    } catch (e) {
      if (e instanceof mongoose.Error.CastError) {
        throw new NotFound(404, 'Producto no encontrado');
      } else {
        throw { error: e, message: 'Hubo un problema al cargar los productos' };
      }
    }
  }

  async getByCategory(category: string): Promise<IItem[]> {
    try {
      const products = await this.productos.find({ categoria: category });
      return products as IItem[];
    } catch (e) {
      throw { error: e, message: 'Hubo un problema al cargar los productos' };
    }
  }

  async save(data: IItem): Promise<IItem> {
    try {
      const newProduct = await new this.productos(data);
      await newProduct.save();
      return newProduct as unknown as IItem;
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        const messages = Object.values(e.errors).map(prop => prop.message);
        throw new ProductValidation(400, messages.join('. '));
      } else {
        throw {
          error: e,
          message: 'Hubo un problema al guardar el producto',
        };
      }
    }
  }

  async update(id: string, data: IItem): Promise<IItem> {
    try {
      const productUpdated = await this.productos.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
        rawResult: true,
      });
      return productUpdated.value as unknown as IItem;
    } catch (e) {
      if (e instanceof mongoose.Error.CastError) {
        throw new NotFound(404, 'El producto que desea actualizar no existe');
      } else if (e instanceof mongoose.Error.ValidationError) {
        const messages = Object.values(e.errors).map(prop => prop.message);
        throw new ProductValidation(400, messages.join('. '));
      } else {
        throw {
          error: e,
          message: 'Hubo un problema al actualizar el producto',
        };
      }
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const productDeleted = await this.productos.findByIdAndRemove(id);
      const carritos = await this.carritoModel.find({});
      carritos.forEach(carrito => {
        const newCarritoProducts = carrito.productos.filter(
          producto => producto.producto.toString() !== id,
        );
        carrito.productos = newCarritoProducts;
        carrito.save();
      });
      if (productDeleted === null)
        throw new NotFound(404, 'El producto que desea eliminar no existe');
    } catch (e) {
      if (e instanceof NotFound) {
        throw e;
      } else if (e instanceof mongoose.Error.CastError) {
        throw new NotFound(404, 'El producto que desea eliminar no existe');
      } else {
        throw { error: e, message: 'Hubo un problema al eliminar el producto' };
      }
    }
  }

  async query(options: IItemQuery): Promise<IItem[]> {
    const query: FilterQuery<IItemBase> = {};

    isQueryValid(options);

    if (options.nombre) query.nombre = options.nombre;

    if (options.codigo) query.codigo = options.codigo;

    if (options.minPrice && options.maxPrice) {
      query.precio = {
        $gte: options.minPrice,
        $lte: options.maxPrice,
      };
    } else if (options.minPrice) {
      query.precio = { $gte: options.minPrice };
    } else if (options.maxPrice) {
      query.precio = { $lte: options.maxPrice };
    }

    if (options.minStock && options.maxStock) {
      query.stock = {
        $gte: options.minStock,
        $lte: options.maxStock,
      };
    } else if (options.minStock) {
      query.stock = { $gte: options.minStock };
    } else if (options.maxStock) {
      query.stock = { $lte: options.maxStock };
    }

    const productos = await this.productos.find(query);

    return productos as IItem[];
  }
}
