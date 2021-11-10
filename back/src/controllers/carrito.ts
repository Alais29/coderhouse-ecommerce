import { Request, Response } from 'express';
import { NotFound, UnauthorizedRoute } from 'errors';
import { carritoAPI } from 'api/carrito';

interface User {
  _id: string;
  email: string;
}

export const getCarrito = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { _id } = req.user as User;
  const productos = await carritoAPI.get(_id);
  res.json({ data: productos });
};

export const getCarritoProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { _id } = req.user as User;
  const producto = await carritoAPI.get(_id, req.params.id);
  if (producto) res.json({ data: producto });
  else throw new NotFound(404, 'El producto no está en el carrito');
};

export const saveCarritoProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  if (req.user) {
    const { _id } = req.user as User;
    const newProducto = await carritoAPI.save(_id, req.params.id);
    res.json({ data: newProducto });
  } else {
    throw new UnauthorizedRoute(401, 'No Autorizado');
  }
};

export const deleteCarritoProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { _id } = req.user as User;
  const newCarritoProductList = await carritoAPI.delete(_id, req.params.id);
  res.json({ data: newCarritoProductList });
};

export const deleteCarritoAllProducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { email } = req.user as User;
  const newCarritoProductList = await carritoAPI.delete(email);
  res.json({ data: newCarritoProductList });
};
