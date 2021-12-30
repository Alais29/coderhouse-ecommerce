import mongoose from 'mongoose';
import { ICarrito, IItemCarrito } from 'common/interfaces/carrito';
import { NotFound } from 'errors';
import { ProductosModel } from 'models/mongoDb/producto';
import { IModelCarritoMongo } from 'models/factory/carrito';

const CarritoSchema = new mongoose.Schema<ICarrito>(
  {
    user: {
      type: 'ObjectId',
      ref: 'User',
    },
    productos: [
      {
        _id: false,
        producto: {
          type: 'ObjectId',
          ref: 'Producto',
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

CarritoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const CarritoModel = mongoose.model<ICarrito>('Carrito', CarritoSchema);

export class CarritoModelMongoDb implements IModelCarritoMongo {
  private carritoModel;
  private productosModel;
  constructor() {
    this.carritoModel = CarritoModel;
    this.productosModel = ProductosModel;
  }

  async createCart(userId: string): Promise<ICarrito> {
    const newCart = new this.carritoModel({
      user: userId,
      productos: [],
    });
    await newCart.save();
    return newCart;
  }

  async get(
    userId: string,
    productId?: string,
  ): Promise<IItemCarrito[] | IItemCarrito> {
    try {
      let output: IItemCarrito[] | IItemCarrito = [];

      const cart = await this.carritoModel
        .findOne({ user: userId })
        .populate('productos.producto');

      if (cart && productId) {
        const product = cart.productos.find(
          item => item.producto.id.toString() === productId,
        );
        if (product) output = product;
        else throw new NotFound(404, 'El producto no está en el carrito');
      } else if (cart) {
        output = cart.productos;
      }
      return output;
    } catch (e) {
      if (e instanceof NotFound) {
        throw e;
      } else if (e instanceof mongoose.Error.CastError) {
        throw new NotFound(404, 'El carrito no existe');
      } else {
        throw { error: e, message: 'Hubo un problema al cargar los productos' };
      }
    }
  }

  async save(userId: string, productId: string): Promise<IItemCarrito[]> {
    try {
      const product = await this.productosModel.findById(productId);

      if (product) {
        // if product exists, get the cart and check if the product is already in it
        const cart = await this.carritoModel
          .findOne({ user: userId })
          .populate('productos.producto');

        if (cart) {
          const productInCartIndex = cart.productos.findIndex(
            item => item.producto.id.toString() === productId,
          );

          if (productInCartIndex === -1) {
            // if it's not in the cart, add 1
            cart.productos = cart.productos.concat({
              producto: product._id,
              quantity: 1,
            });

            await cart.save();
            const updatedCart = await cart.populate('productos.producto');
            return updatedCart.productos;
          } else {
            // if it's in the cart then add 1 more
            cart.productos[productInCartIndex].quantity += 1;
            await cart.save();
            return cart.productos;
          }
        }
        throw new NotFound(404, 'El carrito no existe');
      }
      throw new NotFound(404, 'El producto que deseas agregar no existe');
    } catch (e) {
      if (e instanceof mongoose.Error.CastError) {
        throw new NotFound(
          404,
          'El producto que deseas agregar o el carrito no existe',
        );
      } else if (e instanceof NotFound) {
        throw e;
      } else {
        throw { error: e, message: 'No se pudo agregar el producto' };
      }
    }
  }

  async update(
    userId: string,
    productId: string,
    amount: number,
  ): Promise<IItemCarrito[]> {
    try {
      const cart = await this.carritoModel
        .findOne({ user: userId })
        .populate('productos.producto');

      if (cart) {
        // check if product is in the cart
        const productInCartIndex = cart.productos.findIndex(
          item => item.producto.id.toString() === productId,
        );

        if (productInCartIndex !== -1) {
          // if it is, add the specified amount
          cart.productos[productInCartIndex].quantity = amount;
          await cart.save();
          return cart.productos;
        }
        throw new NotFound(
          404,
          'El producto que deseas editar no está en el carrito',
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

  async delete(userId: string, productId?: string): Promise<IItemCarrito[]> {
    try {
      const cart = await this.carritoModel
        .findOne({ user: userId })
        .populate('productos.producto');

      if (cart && productId) {
        // check that the product to be deleted is in the cart
        const productInCartIndex = cart.productos.findIndex(
          item => item.producto.id.toString() === productId,
        );
        if (productInCartIndex !== -1) {
          // if it is, remove it from cart
          const newProductsInCart = cart.productos.filter(
            item => item.producto.id.toString() !== productId,
          );
          cart.productos = newProductsInCart;

          await cart.save();
          return cart.productos;
        }
        throw new NotFound(
          404,
          'El producto que desea eliminar no está en el carrito',
        );
      }

      if (cart) {
        // if the cart exists but no productId is received, then delete all products
        cart.productos = [];
        await cart.save();
        return cart.productos;
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
