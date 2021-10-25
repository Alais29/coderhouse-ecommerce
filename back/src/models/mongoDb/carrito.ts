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

  //TODO: try to improve method to avoid so many if else's
  async save(id: string, userEmail: string): Promise<IItem> {
    try {
      // get user by userEmail from user collection
      const user = (
        await this.userModel.find({
          email: userEmail,
        })
      )[0];
      // get product to add from productos collection
      const product = await this.productosModel.findById(id);

      if (product) {
        // if product exists
        if (!user.cart) {
          // and user doesn't have a cart yet
          // create the cart with the user id and the product to add
          const cartToSave = new this.carritoModel({
            user: user._id,
            productos: [product._id],
          });
          const savedCart = await cartToSave.save();

          // add the cart to the user and save it
          user.cart = savedCart._id;
          await user.save();

          //return the product added
          return product as IItem;
        } else {
          // is user already has a cart
          // get that cart from the carritos collection
          const cart = await this.carritoModel.findById(user.cart);

          if (cart) {
            // if the cart exists
            // check if the product to add is already in the cart
            const isProductToAddInCart = cart?.productos.find(
              item => item.toString() === id,
            );

            if (isProductToAddInCart) {
              // if it's already in the cart, throw an error
              throw new RepeatedProductInCart(
                400,
                'El producto que desea agregar ya se encuentra en el carrito',
              );
            } else {
              // if it's not in the cart
              // add it, save it and return the product added
              cart.productos = cart.productos.concat(product._id);
              await cart.save();
              return product as IItem;
            }
          } else {
            // if cart doesn't exists throw an error
            throw new NotFound(404, 'El carrito no existe');
          }
        }
      } else {
        // if product doesn't exists throw an error
        throw new NotFound(404, 'El producto que deseas agregar no existe');
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
