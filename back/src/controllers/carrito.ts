import { Request, Response } from 'express';
import { NotFound, RepeatedProductInCart } from 'errors';
import { CarritoModelFactory } from 'models/factory/carrito';

const modelFactory = new CarritoModelFactory(0);

export const getCarrito = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productos = await modelFactory.model().get();
    if (productos.length !== 0) res.json({ data: productos });
    else throw new NotFound('No hay productos en el carrito');
  } catch (e) {
    if (e instanceof NotFound) {
      res.status(404).json({ error: e.error, message: e.message });
    } else {
      res.status(404).json(e);
    }
  }
};

export const getCarritoProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const producto = await modelFactory.model().get(req.params.id);
    if (producto) res.json({ data: producto });
    else throw new NotFound('El producto no está en el carrito');
  } catch (e) {
    if (e instanceof NotFound) {
      res.status(404).json({ error: e.error, message: e.message });
    } else {
      res.status(404).json(e);
    }
  }
};

export const saveCarritoProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newProducto = await modelFactory.model().save(req.params.id);
    res.json({ data: newProducto });
  } catch (e) {
    if (e instanceof NotFound || e instanceof RepeatedProductInCart) {
      res.status(400).json({ error: e.error, message: e.message });
    } else {
      res.status(400).json(e);
    }
  }
};

export const deleteCarritoProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newCarritoProductList = await modelFactory.model().delete(req.params.id);
    res.json({ data: newCarritoProductList });
  } catch (e) {
    if (e instanceof NotFound) {
      res.status(404).json({ error: e.error, message: e.message });
    } else {
      res.status(404).json(e);
    }
  }
};
