import { Request, Response } from 'express';
import { NotFound, UnauthorizedRoute } from 'errors';
import { carritoAPI } from 'api/carrito';

interface User {
  email: string;
}

export const getCarrito = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { email } = req.user as User;
  const productos = await carritoAPI.get(email);
  res.json({ data: productos });
};

export const getCarritoProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { email } = req.user as User;
  const producto = await carritoAPI.get(email, req.params.id);
  if (producto) res.json({ data: producto });
  else throw new NotFound(404, 'El producto no está en el carrito');
};

export const saveCarritoProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  if (req.user) {
    const { email } = req.user as User;
    const newProducto = await carritoAPI.save(req.params.id, email);
    res.json({ data: newProducto });
  } else {
    throw new UnauthorizedRoute(401, 'No Autorizado');
  }
};

export const deleteCarritoProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { email } = req.user as User;
  const newCarritoProductList = await carritoAPI.delete(req.params.id, email);
  res.json({ data: newCarritoProductList });
};
