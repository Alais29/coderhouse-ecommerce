import { Request, Response } from 'express';
import { IItem } from '../common/interfaces';
import { productosService } from '../services/producto';

const {
  getProductosService,
  getProductoService,
  saveProductoService,
  updateProductoService,
  deleteProductoService,
} = productosService;

export const getProductos = async (req: Request, res: Response): Promise<void> => {
  try {
    const productos = await getProductosService();
    if (productos.length !== 0) res.json({ data: productos });
    else throw new Error('No hay productos');
  } catch (e) {
    res.status(400).json({ error: e.error, message: e.message });
  }
};

export const getProducto = async (req: Request, res: Response): Promise<void> => {
  try {
    const producto = await getProductoService(req.params.id);
    if (producto) res.json({ data: producto });
    else throw new Error('Producto no encontrado');
  } catch (e) {
    res.status(400).json({ error: e.error, message: e.message });
  }
};

export const saveProducto = async (req: Request, res: Response): Promise<void> => {
  try {
    const producto = req.body;
    const newProducto: IItem = await saveProductoService(producto);
    res.json({ data: newProducto });
  } catch (e) {
    res.status(400).json({ error: e.error, message: e.message });
  }
};

export const updateProducto = async (req: Request, res: Response): Promise<void> => {
  try {
    const producto = await updateProductoService(req.params.id, req.body);
    res.json({ data: producto });
  } catch (e) {
    res.status(404).json({ error: e.error, message: e.message });
  }
};

export const deleteProducto = async (req: Request, res: Response): Promise<void> => {
  try {
    const newProductList = await deleteProductoService(req.params.id);
    res.json({ data: newProductList });
  } catch (e) {
    res.status(404).json({ error: e.error, message: e.message });
  }
};