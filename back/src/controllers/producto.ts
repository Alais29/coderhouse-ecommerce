import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { isValidProduct } from 'utils/validations';
import { IItem, IItemQuery } from 'common/interfaces/products';
import { NotFound, NotImplemented, ProductValidation } from 'errors';
import { productsAPI } from 'api/productos';
import { isEmpty } from 'utils/others';
import {
  deleteFromCloudinary,
  uploadMultipleToCloudinary,
} from 'utils/cloudinary';

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
    if (!isEmpty(productos)) res.json({ data: productos });
    else throw new NotFound(404, 'No hay productos');
  }
};

export const getProducto = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const producto = await productsAPI.get(req.params.id);
  if (!isEmpty(producto)) res.json({ data: producto });
  else throw new NotFound(404, 'Producto no encontrado');
};

export const getProductosByCategory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const productos = await productsAPI.getByCategory(req.params.category);
  if (productos) res.json({ data: productos });
  else throw new NotImplemented(500, 'Método no implementado');
};

export const saveProducto = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const producto = req.body;

  producto.precio = Number(producto.precio);
  producto.stock = Number(producto.stock);

  isValidProduct(producto);

  if (req.files) {
    const files = req.files.fotos as UploadedFile[];
    const cldyUrlsIds = await uploadMultipleToCloudinary(files, 'Products');
    producto.fotos = cldyUrlsIds.fotosUrls;
    producto.fotosId = cldyUrlsIds.fotosId;
  } else {
    throw new ProductValidation(
      400,
      'Por favor ingresa una imagen del producto.',
    );
  }

  const newProducto: IItem = await productsAPI.save(producto);
  res
    .location(`/api/productos/${newProducto.id}`)
    .status(201)
    .json({ data: newProducto });
};

export const updateProducto = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const dataToUpdate = req.body;

  dataToUpdate.precio = Number(dataToUpdate.precio);
  dataToUpdate.stock = Number(dataToUpdate.stock);
  dataToUpdate.fotos = JSON.parse(dataToUpdate.fotos);
  dataToUpdate.fotosId = JSON.parse(dataToUpdate.fotosId);

  isValidProduct(dataToUpdate, ['fotos', 'fotosId']);

  // if new files are uploaded, save them on cloudinary
  if (req.files) {
    const files = req.files.newFotos as UploadedFile[];
    const cldyUrlsIds = await uploadMultipleToCloudinary(files, 'Products');
    dataToUpdate.fotos = [...dataToUpdate.fotos, ...cldyUrlsIds.fotosUrls];
    dataToUpdate.fotosId = [...dataToUpdate.fotosId, ...cldyUrlsIds.fotosId];
  }

  // if images were removed from fotosId array delete those images from cloudinary
  await deleteFromCloudinary(req.params.id, 'update', dataToUpdate);

  const producto = await productsAPI.update(req.params.id, dataToUpdate);
  res.json({ data: producto });
};

export const deleteProducto = async (
  req: Request,
  res: Response,
): Promise<void> => {
  await deleteFromCloudinary(req.params.id, 'delete');
  await productsAPI.delete(req.params.id);
  res.json({ data: 'Producto eliminado' });
};
