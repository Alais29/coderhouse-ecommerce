import { Schema } from 'mongoose';
import { ProductoDTO } from './productos.dto';

export const ProductoSchema = new Schema<ProductoDTO>(
  {
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
    foto: { type: String, require: true },
    stock: { type: Number, default: 0 },
  },
  {
    timestamps: {
      createdAt: 'timestamp',
    },
  },
);
