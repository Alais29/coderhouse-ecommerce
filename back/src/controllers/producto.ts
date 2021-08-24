import { Request, Response } from 'express';
import { IItem } from '../common/interfaces';
import { productos } from '../persistencia/producto';
import { EErrorCodes } from '../common/enums';

const {
  getProductosPersist,
  getProductoPersist,
  saveProductoPersist,
  updateProductoPersist,
  deleteProductoPersist,
} = productos;

export const getProductos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productos = await getProductosPersist();
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
    const producto = await getProductoPersist(req.params.id);
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
    const newProducto: IItem = await saveProductoPersist(producto);
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
    const producto = await updateProductoPersist(req.params.id, req.body);
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
    await deleteProductoPersist(req.params.id);
    res.json({ data: 'Producto eliminado' });
  } catch (e) {
    res.status(404).json({ error: e.error, message: e.message });
  }
};
