import { Request, Response } from 'express';
import { NotFound } from 'errors';
import { carritoAPI } from 'api/carrito';

export const getCarrito = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const productos = await carritoAPI.get();
  res.json({ data: productos });
};

export const getCarritoProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const producto = await carritoAPI.get(req.params.id);
  if (producto) res.json({ data: producto });
  else throw new NotFound(404, 'El producto no está en el carrito');
};

export const saveCarritoProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const newProducto = await carritoAPI.save(req.params.id);
  res.json({ data: newProducto });
};

export const deleteCarritoProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const newCarritoProductList = await carritoAPI.delete(req.params.id);
  res.json({ data: newCarritoProductList });
};
