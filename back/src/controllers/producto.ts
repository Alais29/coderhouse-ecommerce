import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { isValidProduct } from 'utils/validations';
import { IItem } from 'common/interfaces';
import { productosModel } from 'models/producto';
import { MissingFieldsProduct, NotFound, ProductValidation } from 'errors';

export const getProductos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productos = await productosModel.get();
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
    const producto = await productosModel.get(req.params.id);
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

    producto.id = uuidv4();
    producto.precio = Number(producto.precio);
    producto.stock = Number(producto.stock);
    producto.timestamp = moment().format('DD/MM/YYYY HH:mm:ss');

    isValidProduct(producto);

    const newProducto: IItem = await productosModel.save(producto);
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

    const producto = await productosModel.update(req.params.id, dataToUpdate);
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
    await productosModel.delete(req.params.id);
    res.json({ data: 'Producto eliminado' });
  } catch (e) {
    if (e instanceof NotFound) {
      res.status(404).json({ error: e.error, message: e.message });
    } else {
      res.status(404).json(e);
    }
  }
};
