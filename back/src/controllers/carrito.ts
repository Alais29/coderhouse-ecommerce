import { Request, Response } from 'express';
import { NotFound, ProductValidation } from 'errors';
import { carritoAPI } from 'api/carrito';
import { IItemCarrito } from 'common/interfaces/carrito';

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
  const { _id } = req.user as User;
  const newCart = (await carritoAPI.save(_id, req.params.id)) as IItemCarrito[];
  res.status(200).json({ data: newCart });
};

export const editCarritoProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { _id } = req.user as User;
  const { productId, amount } = req.body;

  if (!productId)
    throw new ProductValidation(
      404,
      'Debe ingresar el id del producto a editar',
    );

  if (!amount)
    throw new ProductValidation(
      404,
      'Debe ingresar la cantidad del producto a editar',
    );

  if (Number(amount) === 0)
    res.json({ data: await carritoAPI.delete(_id, productId) });
  else if (Number(amount) > 0)
    res.json({
      data: await carritoAPI.update(_id, productId, Number(amount)),
    });
  else
    throw new ProductValidation(
      404,
      'La cantidad debe ser un número mayor o igual a 0',
    );
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
  const { _id } = req.user as User;
  const newCarritoProductList = await carritoAPI.delete(_id);
  res.json({ data: newCarritoProductList });
};
