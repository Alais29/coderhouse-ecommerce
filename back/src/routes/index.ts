import express, { Request, Response } from 'express';
import { IItem } from '../common/interfaces';
import { isAdmin } from '../middlewares/isAdmin';
import { productosService } from '../services/producto';
import { throwUnauthorizedError } from '../utils/others';

const routes = express.Router();

const {
  getProductos,
  getProducto,
  saveProducto,
  updateProducto,
  deleteProducto,
} = productosService;

routes.get(
  '/productos/listar',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const productos = await getProductos();
      if (productos.length !== 0) res.json({ data: productos });
      else throw new Error('No hay productos');
    } catch (e) {
      res.status(400).json({ error: e.error, message: e.message });
    }
  }
);

routes.get(
  '/productos/listar/:id',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const producto = await getProducto(req.params.id);
      if (producto) res.json({ data: producto });
      else throw new Error('Producto no encontrado');
    } catch (e) {
      res.status(400).json({ error: e.error, message: e.message });
    }
  }
);

routes.post(
  '/productos/guardar', isAdmin,
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (req.admin) {
        const producto = req.body;
        const newProducto: IItem = await saveProducto(producto);
        res.json({ data: newProducto });
      } else {
        throwUnauthorizedError(req);
      }
    } catch (e) {
      res.status(400).json({ error: e.error, message: e.message, descripcion: e.descripcion });
    }
  }
);

routes.put(
  '/productos/actualizar/:id', isAdmin,
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (req.admin) {
        const producto = await updateProducto(req.params.id, req.body);
        res.json({ data: producto });
      } else {
        throwUnauthorizedError(req);
      }
    } catch (e) {
      res.status(404).json({ error: e.error, message: e.message, descripcion: e.descripcion });
    }
  }
);

routes.delete(
  '/productos/borrar/:id', isAdmin,
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (req.admin) {
        await deleteProducto(req.params.id);
        const productos = await getProductos();
        res.json({ data: productos });
      } else {
        throwUnauthorizedError(req);
      }
    } catch (e) {
      res.status(404).json({ error: e.error, message: e.message, descripcion: e.descripcion });
    }
  }
);

export default routes;
