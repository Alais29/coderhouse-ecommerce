import { Request, Response } from 'express';
import { IItem } from '../common/interfaces';
import { productosService } from '../services/producto';
import { EErrorCodes } from '../common/enums';

const {
  getProductosService,
  getProductoService,
  saveProductoService,
  updateProductoService,
  deleteProductoService,
} = productosService;

export const getProductos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productos = await getProductosService();
    if (productos.length !== 0) res.json({ data: productos });
    else
      throw {
        error: `-${EErrorCodes.ProductNotFound}`,
        message: 'No hay productos',
      };
  } catch (e) {
    res.status(404).json({ error: e.error, message: e.message });
  }
};

export const getProducto = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const producto = await getProductoService(req.params.id);
    if (producto) res.json({ data: producto });
    else
      throw {
        error: `-${EErrorCodes.ProductNotFound}`,
        message: 'Producto no encontrado',
      };
  } catch (e) {
    res.status(404).json({ error: e.error, message: e.message });
  }
};

export const saveProducto = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const producto = req.body;
    const newProducto: IItem = await saveProductoService(producto);
    res.json({ data: newProducto });
  } catch (e) {
    if (e.error.errno) {
      res.status(404).json({ error: e.error, message: e.message });
    } else {
      res.status(400).json({
        error: e.error,
        message: e.message,
        descripcion: e.descripcion,
      });
    }
  }
};

export const updateProducto = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const producto = await updateProductoService(req.params.id, req.body);
    res.json({ data: producto });
  } catch (e) {
    if (e.error.errno) {
      res.status(404).json({ error: e.error, message: e.message });
    } else {
      res.status(400).json({
        error: e.error,
        message: e.message,
        descripcion: e.descripcion,
      });
    }
  }
};

export const deleteProducto = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newProductList = await deleteProductoService(req.params.id);
    res.json({ data: newProductList });
  } catch (e) {
    res.status(404).json({ error: e.error, message: e.message });
  }
};
