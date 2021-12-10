import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductoSchema } from './productos/dto/productos.schema';
import * as dotenv from 'dotenv';
import { ProductosController } from './productos/productos.controller';
import { ProductosService } from './productos/productos.service';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_ATLAS_SRV),
    MongooseModule.forFeature([{ name: 'Producto', schema: ProductoSchema }]),
    MongooseModule.forFeatureAsync([
      {
        name: 'Producto',
        useFactory: () => {
          const schema = ProductoSchema;
          schema.plugin(require('mongoose-unique-validator'), {
            message: 'El código ya existe, ingrese uno diferente.',
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [AppController, ProductosController],
  providers: [AppService, ProductosService],
})
export class AppModule {}
