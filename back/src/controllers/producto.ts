import { Request, Response } from 'express';
import { isValidProduct } from '/utils/validations';
import { IItem } from '/common/interfaces';
import { productosModel } from '/models/productoMySql';
import { EErrorCodes } from '/common/enums';

export const getProductos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productos = await productosModel.getAll();
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
    const producto = await productosModel.get(Number(req.params.id));
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

    // producto.id = uuidv4();
    producto.precio = Number(producto.precio);
    producto.stock = Number(producto.stock);
    // producto.timestamp = moment().format('DD/MM/YYYY HH:mm:ss');

    isValidProduct(producto);

    const newProducto: IItem = await productosModel.save(producto);
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
    const dataToUpdate = req.body;

    dataToUpdate.precio = Number(dataToUpdate.precio);
    dataToUpdate.stock = Number(dataToUpdate.stock);

    isValidProduct(dataToUpdate);

    const producto = await productosModel.update(
      Number(req.params.id),
      dataToUpdate
    );
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
    await productosModel.delete(Number(req.params.id));
    res.json({ data: 'Producto eliminado' });
  } catch (e) {
    res.status(404).json({ error: e.error, message: e.message });
  }
};
