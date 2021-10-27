import { IItem, ICarrito } from 'common/interfaces';
import mongoose from 'mongoose';
import { NotFound, RepeatedProductInCart } from 'errors';
import { ProductosModel } from 'models/mongoDb/producto';
import { UserModel } from 'models/mongoDb/user';

const CarritoSchema = new mongoose.Schema<ICarrito>({
  user: {
    type: 'ObjectId',
    ref: 'User',
  },
  productos: [
    {
      type: 'ObjectId',
      ref: 'Producto',
    },
  ],
});

CarritoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const CarritoModel = mongoose.model<ICarrito>('Carrito', CarritoSchema);

export class CarritoModelMongoDb {
  private carritoModel;
  private productosModel;
  private userModel;
  constructor() {
    this.carritoModel = CarritoModel;
    this.productosModel = ProductosModel;
    this.userModel = UserModel;
  }

  async get(userEmail: string, id?: string): Promise<IItem[] | IItem> {
    try {
      let output: IItem[] | IItem = [];
      // get user and his cart
      const user = (
        await this.userModel.find({
          email: userEmail,
        })
      )[0];
      const cart = await this.carritoModel
        .findById(user.cart)
        .populate('productos');
      if (cart && id) {
        // if there's a product id in the request, search for that product in the cart
        const product = cart.productos.find(item => item._id.toString() === id);
        // if the product is in the cart return that product, if it's not throw an error
        if (product) output = product as unknown as IItem;
        else throw new NotFound(404, 'El producto no está en el carrito');
      } else if (cart) {
        // if there's no id in the request return all the products in the cart
        const products = cart.productos;
        output = products as unknown as IItem[];
      }
      return output;
    } catch (e) {
      if (e instanceof NotFound) {
        throw e;
      } else if (e instanceof mongoose.Error.CastError) {
        throw new NotFound(
          404,
          'El carrito no existe o el producto no está en el carrito',
        );
      } else {
        throw { error: e, message: 'Hubo un problema al cargar los productos' };
      }
    }
  }

  async save(id: string, userEmail: string): Promise<IItem> {
    try {
      // get user and product
      const user = (
        await this.userModel.find({
          email: userEmail,
        })
      )[0];
      const product = await this.productosModel.findById(id);

      if (product) {
        // if product exists, get the cart from the collection and check if the product is already in the cart
        const cart = (await this.carritoModel.findById(user.cart)) as ICarrito;
        const isProductToAddInCart = cart.productos.find(
          item => item.toString() === id,
        );

        if (!isProductToAddInCart) {
          // if it's not in the cart, add it, save it and return the product added
          cart.productos = cart.productos.concat(product._id);
          await cart.save();
          return product as IItem;
        }
        // if the product is already in the cart, throw an error
        throw new RepeatedProductInCart(
          400,
          'El producto que desea agregar ya se encuentra en el carrito',
        );
      }
      // if the product does not exists throw an error
      throw new NotFound(404, 'El producto que deseas agregar no existe');
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

  async delete(id: string, userEmail: string): Promise<IItem[]> {
    try {
      // get user and his cart
      const user = (
        await this.userModel.find({
          email: userEmail,
        })
      )[0];
      const cart = await this.carritoModel
        .findById(user.cart)
        .populate('productos');

      if (cart) {
        // check that the product to be deleted is in the cart
        const productToDelete = cart.productos.find(
          item => item._id.toString() === id,
        );
        if (productToDelete) {
          // if so, remove it, save the cart and return the new list of products in the cart
          const newProductsInCart = cart.productos.filter(
            item => item._id.toString() !== id,
          );
          cart.productos = newProductsInCart;
          await cart.save();
          return newProductsInCart as unknown as IItem[];
        }
        // if not, throw an error
        throw new NotFound(
          404,
          'El producto que desea eliminar no está en el carrito',
        );
      }
      throw new NotFound(404, 'El carrito no existe');
    } catch (e) {
      if (e instanceof NotFound) {
        throw e;
      } else if (e instanceof mongoose.Error.CastError) {
        throw new NotFound(404, 'El carrito no existe');
      } else {
        throw { error: e, message: 'Hubo un problema al eliminar el producto' };
      }
    }
  }
}
