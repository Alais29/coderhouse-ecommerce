import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductoDTO } from './dto/productos.dto';
import { ProductosService } from './productos.service';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productoService: ProductosService) {}

  @Get()
  getAllProducts(): Promise<ProductoDTO[]> {
    return this.productoService.getAll();
  }
  @Get(':id')
  getProduct(@Param('id') idProducto): Promise<ProductoDTO> {
    return this.productoService.getProduct(idProducto);
  }

  @Post()
  @UsePipes(ValidationPipe)
  saveProduct(@Body() producto: ProductoDTO): Promise<ProductoDTO> {
    return this.productoService.createProduct(producto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  editProduct(
    @Param('id') idProducto: string,
    @Body() producto: ProductoDTO,
  ): Promise<ProductoDTO> {
    return this.productoService.editProduct(idProducto, producto);
  }

  @Delete(':id')
  deleteProduct(@Param('id') idProducto: string): Promise<void> {
    return this.productoService.deleteProduct(idProducto);
  }
}
