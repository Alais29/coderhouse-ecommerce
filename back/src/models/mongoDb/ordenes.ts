import mongoose from 'mongoose';
import { IOrder, IOrderBase } from 'common/interfaces/ordenes';

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
    const newOrder = new this.ordenesModel({
      user: userId,
      ...order,
    });
    await newOrder.save();
    return (
      await newOrder.populate({
        path: 'productos.producto',
        select: 'nombre descripcion precio',
      })
    ).populate({
      path: 'user',
      select: 'nombre email',
    });
  }
}
