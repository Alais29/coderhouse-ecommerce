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

const CarritoModel = mongoose.model<ICarrito>('Carrito', CarritoSchema);

export class CarritoModelMongoDb {
  private carritoModel;
  private productosModel;
  private userModel;
  constructor() {
    this.carritoModel = CarritoModel;
    this.productosModel = ProductosModel;
    this.userModel = UserModel;
  }

  //TODO: implement get method with the new cart structure
  async get(id?: string): Promise<IItem[] | IItem> {
    try {
      let output: IItem[] | IItem = [];
      if (id) {
        const document = await this.carritoModel.findById(id);
        if (document) output = document as unknown as IItem;
        else throw new NotFound(404, 'El producto no está en el carrito');
      } else {
        const products = await this.carritoModel.find();
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

  async save(id: string, userEmail: string): Promise<IItem> {
    try {
      // get user and product from respective collections
      const user = (
        await this.userModel.find({
          email: userEmail,
        })
      )[0];
      const product = await this.productosModel.findById(id);

      if (product && !user.cart) {
        // if product exists but user does not have a car
        // create the cart with the user id and the product to add and save it
        const cartToSave = new this.carritoModel({
          user: user._id,
          productos: [product._id],
        });
        const savedCart = await cartToSave.save();

        // add the cart to the user, save it and return the product added
        user.cart = savedCart._id;
        await user.save();
        return product as IItem;
      }

      if (product && user.cart) {
        // if user exists and user already has a cart, get the cart from the collection
        // and check if the product is already in the cart
        const cart = (await this.carritoModel.findById(user.cart)) as ICarrito;
        const isProductToAddInCart = cart?.productos.find(
          item => item.toString() === id,
        );

        if (!isProductToAddInCart) {
          // if the product is not in the cart, add it, save it and return the product added
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

  //TODO: implement delete method with the new cart structure
  async delete(id: string): Promise<IItem[]> {
    try {
      await this.carritoModel.findByIdAndRemove(id);
      const carritoProducts = await this.get();
      return carritoProducts as IItem[];
    } catch (e) {
      if (e instanceof mongoose.Error.CastError) {
        throw new NotFound(
          404,
          'El producto que desea eliminar no está en el carrito',
        );
      } else {
        throw { error: e, message: 'Hubo un problema al eliminar el producto' };
      }
    }
  }
}
