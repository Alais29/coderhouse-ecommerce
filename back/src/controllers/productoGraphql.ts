import { productsAPI } from 'api/productos';
import { IItem, IItemBase } from 'common/interfaces/products';
import { NotFound } from 'errors';
import { isValidProduct } from 'utils/validations';

export const getProductos = async (): Promise<IItem | IItem[]> => {
  const productos = await productsAPI.get();
  if (productos.length !== 0) return productos;
  else throw new NotFound(404, 'No hay productos');
};

export const getProducto = async (args: { id: string }): Promise<IItem> => {
  const producto = await productsAPI.get(args.id);
  if (producto) return producto as IItem;
  else throw new NotFound(404, 'Producto no encontrado');
};

export const saveProducto = async (args: {
  producto: IItemBase;
}): Promise<IItem> => {
  const producto = args.producto;

  producto.precio = Number(producto.precio);
  producto.stock = Number(producto.stock);
  isValidProduct(producto);

  const newProducto: IItem = await productsAPI.save(producto);
  return newProducto;
};