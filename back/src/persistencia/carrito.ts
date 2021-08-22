import { Request, Response } from 'express';
import { carritoService } from '../services/carrito';
import { EErrorCodes } from '../common/enums';

const {
  getCarritoService,
  getCarritoProductService,
  saveCarritoProductService,
  deleteCarritoProductService,
} = carritoService;

export const getCarrito = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productos = await getCarritoService();
    if (productos.length !== 0) res.json({ data: productos });
    else
      throw {
        error: `-${EErrorCodes.ProductNotFound}`,
        message: 'No hay productos en el carrito',
      };
  } catch (e) {
    res.status(404).json({ error: e.error, message: e.message });
  }
};

export const getCarritoProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const producto = await getCarritoProductService(req.params.id);
    if (producto) res.json({ data: producto });
    else
      throw {
        error: `-${EErrorCodes.ProductNotFound}`,
        message: 'El producto no está en el carrito',
      };
  } catch (e) {
    res.status(404).json({ error: e.error, message: e.message });
  }
};

export const saveCarritoProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newProducto = await saveCarritoProductService(req.params.id);
    res.json({ data: newProducto });
  } catch (e) {
    res.status(400).json({ error: e.error, message: e.message });
  }
};

export const deleteCarritoProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newCarritoProductList = await deleteCarritoProductService(
      req.params.id
    );
    res.json({ data: newCarritoProductList });
  } catch (e) {
    res.status(404).json({ error: e.error, message: e.message });
  }
};
