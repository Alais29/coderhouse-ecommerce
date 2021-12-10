import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductoDTO } from './dto/productos.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectModel('Producto') private readonly productoModel: Model<ProductoDTO>,
  ) {}

  async getAll(): Promise<ProductoDTO[]> {
    return this.productoModel.find();
  }

  async getProduct(idProducto: string): Promise<ProductoDTO> {
    return this.productoModel.findById(idProducto);
  }

  async createProduct(producto: ProductoDTO): Promise<ProductoDTO> {
    const nuevoProducto = new this.productoModel(producto);
    return await nuevoProducto.save();
  }

  async editProduct(
    idProducto: string,
    producto: ProductoDTO,
  ): Promise<ProductoDTO> {
    return this.productoModel.findByIdAndUpdate(idProducto, producto, {
      new: true,
    });
  }

  async deleteProduct(idProducto: string): Promise<void> {
    await this.productoModel.findByIdAndDelete(idProducto);
  }
}
