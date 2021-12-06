import mongoose from 'mongoose';
import { IOrder, IOrderBase } from 'common/interfaces/ordenes';
import { NotFound, OrderCreateError } from 'errors';

const Schema = mongoose.Schema;

const OrderSchema = new Schema<IOrder>(
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
    total: { type: Number, required: true },
    estado: { type: String, required: true },
    direccionEntrega: { type: String, required: true },
    codigoPostal: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: 'timestamp',
    },
  },
);

OrderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const OrdenesModel = mongoose.model<IOrder>('Order', OrderSchema);

export class OrdenesModelMongoDb {
  private ordenesModel;

  constructor() {
    this.ordenesModel = OrdenesModel;
  }

  async save(userId: string, order: IOrderBase): Promise<IOrder> {
    try {
      const newOrder = new this.ordenesModel({
        user: userId,
        ...order,
      });
      await newOrder.save();
      return await newOrder.populate({
        path: 'productos.producto',
        select: 'nombre descripcion precio',
      });
    } catch (e) {
      if (e instanceof mongoose.Error.CastError) {
        throw new OrderCreateError(
          500,
          'Hubo un error al guardar la orden, por favor espera un momento e intenta de nuevo.',
        );
      } else {
        throw {
          error: e,
          message:
            'Hubo un error al guardar la orden, por favor espera un momento e intenta de nuevo.',
        };
      }
    }
  }

  async get(userId: string, orderId?: string): Promise<IOrder | IOrder[]> {
    try {
      let output: IOrder | IOrder[] = [];

      if (orderId) {
        const order = await this.ordenesModel.findById(orderId).populate({
          path: 'productos.producto',
          select: 'nombre descripcion precio',
        });
        if (order && userId.toString() === order.user.toString())
          output = order;
        else
          throw new NotFound(
            400,
            'No se encontró la orden, por favor verifica el número de orden',
          );
      } else {
        const orders = await this.ordenesModel.find({ user: userId }).populate({
          path: 'productos.producto',
          select: 'nombre descripcion precio',
        });
        output = orders;
      }
      return output;
    } catch (e) {
      if (e instanceof mongoose.Error.CastError) {
        throw new NotFound(
          404,
          'No se pudo encontrar la/s orden/es, verifica los datos e intenta nuevamente',
        );
      } else if (e instanceof NotFound) {
        throw e;
      } else {
        throw {
          error: e,
          message:
            'Hubo un error al buscar la/s orden/es, por favor espera un momento e intenta de nuevo',
        };
      }
    }
  }

  async update(orderId: string): Promise<IOrder> {
    try {
      const orderToUpdate = await this.ordenesModel.findById(orderId).populate({
        path: 'productos.producto',
        select: 'nombre descripcion precio',
      });

      if (!orderToUpdate || orderToUpdate.estado !== 'generada') {
        throw new NotFound(
          400,
          'La orden no existe o ya se encuentra completada. Verifique la id de la orden',
        );
      }

      orderToUpdate.estado = 'completada';
      await orderToUpdate.save();
      return orderToUpdate;
    } catch (e) {
      if (e instanceof mongoose.Error.CastError) {
        throw new NotFound(400, 'La orden no existe.');
      } else if (e instanceof NotFound) {
        throw e;
      } else {
        throw {
          error: e,
          message:
            'Hubo un error al completar la orden, por favor espera un momento e intenta de nuevo',
        };
      }
    }
  }
}
