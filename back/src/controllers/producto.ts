import { Request, Response } from 'express';
import { isValidProduct } from 'utils/validations';
import { IItem, IItemQuery } from 'common/interfaces';
import { NotFound } from 'errors';
import { productsAPI } from 'api/productos';
import { isEmpty } from 'utils/others';

export const getProductos = async (
  req: Request,
  res: Response,
): Promise<void> => {
  if (!isEmpty(req.query)) {
    const { nombre, codigo, minPrice, maxPrice, minStock, maxStock } =
      req.query;
    const query: IItemQuery = {};

    if (nombre) query.nombre = nombre.toString();
    if (codigo) query.codigo = codigo.toString();
    if (minPrice) query.minPrice = Number(minPrice);
    if (maxPrice) query.maxPrice = Number(maxPrice);
    if (minStock) query.minStock = Number(minStock);
    if (maxStock) query.maxStock = Number(maxStock);

    res.json({
      data: await productsAPI.query(query),
    });
  } else {
    const productos = await productsAPI.get();
    if (productos.length !== 0) res.json({ data: productos });
    else throw new NotFound(404, 'No hay productos');
  }
};

export const getProducto = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const producto = await productsAPI.get(req.params.id);
  if (producto) res.json({ data: producto });
  else throw new NotFound(404, 'Producto no encontrado');
};

export const saveProducto = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const producto = req.body;

  producto.precio = Number(producto.precio);
  producto.stock = Number(producto.stock);

  isValidProduct(producto);

  const newProducto: IItem = await productsAPI.save(producto);
  res.json({ data: newProducto });
};

export const updateProducto = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const dataToUpdate = req.body;

  dataToUpdate.precio = Number(dataToUpdate.precio);
  dataToUpdate.stock = Number(dataToUpdate.stock);

  isValidProduct(dataToUpdate);

  const producto = await productsAPI.update(req.params.id, dataToUpdate);
  res.json({ data: producto });
};

export const deleteProducto = async (
  req: Request,
  res: Response,
): Promise<void> => {
  await productsAPI.delete(req.params.id);
  res.json({ data: 'Producto eliminado' });
};
