import { Test, TestingModule } from '@nestjs/testing';
import { ProductosController } from './productos.controller';

describe('ProductosController', () => {
  let controller: ProductosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductosController],
    }).compile();

    controller = module.get<ProductosController>(ProductosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
