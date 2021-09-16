import { Request, Response } from 'express';
import { isValidProduct } from 'utils/validations';
import { IItem } from 'common/interfaces';
import { MissingFieldsProduct, NotFound, ProductValidation } from 'errors';
import { productsAPI } from 'api/productos';

export const getProductos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productos = await productsAPI.get();
    if (productos.length !== 0) res.json({ data: productos });
    else throw new NotFound('No hay productos');
  } catch (e) {
    if (e instanceof NotFound) {
      res.status(404).json({ error: e.error, message: e.message });
    } else {
      res.status(404).json(e);
    }
  }
};

export const getProducto = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const producto = await productsAPI.get(req.params.id);
    if (producto) res.json({ data: producto });
    else throw new NotFound('Producto no encontrado');
  } catch (e) {
    if (e instanceof NotFound) {
      res.status(404).json({ error: e.error, message: e.message });
    } else {
      res.status(404).json(e);
    }
  }
};

export const saveProducto = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const producto = req.body;

    producto.precio = Number(producto.precio);
    producto.stock = Number(producto.stock);

    isValidProduct(producto);

    const newProducto: IItem = await productsAPI.save(producto);
    res.json({ data: newProducto });
  } catch (e) {
    if (e instanceof MissingFieldsProduct) {
      res.status(400).json({
        error: e.error,
        message: e.message,
        descripcion: e.descripcion,
      });
    } else if (e instanceof ProductValidation) {
      res.status(400).json({
        error: e.error,
        message: e.message,
      });
    } else {
      res.status(404).json(e);
    }
  }
};

export const updateProducto = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const dataToUpdate = req.body;

    dataToUpdate.precio = Number(dataToUpdate.precio);
    dataToUpdate.stock = Number(dataToUpdate.stock);

    isValidProduct(dataToUpdate);

    const producto = await productsAPI.update(req.params.id, dataToUpdate);
    res.json({ data: producto });
  } catch (e) {
    if (e instanceof MissingFieldsProduct) {
      res.status(400).json({
        error: e.error,
        message: e.message,
        descripcion: e.descripcion,
      });
    } else if (e instanceof ProductValidation) {
      res.status(400).json({
        error: e.error,
        message: e.message,
      });
    } else if (e instanceof NotFound) {
      res.status(404).json({ error: e.error, message: e.message });
    } else {
      res.status(404).json(e);
    }
  }
};

export const deleteProducto = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await productsAPI.delete(req.params.id);
    res.json({ data: 'Producto eliminado' });
  } catch (e) {
    if (e instanceof NotFound) {
      res.status(404).json({ error: e.error, message: e.message });
    } else {
      res.status(404).json(e);
    }
  }
};
