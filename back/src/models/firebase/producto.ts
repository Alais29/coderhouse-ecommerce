import { IItem, IItemQuery } from 'common/interfaces/products';
import { NotFound } from 'errors';
import admin, { firestore } from 'firebase-admin';
import { productosMock } from 'mocks/products';
import moment from 'moment';
import Config from 'config';
import { logger } from 'services/logger';

export class ProductosModelFirebase {
  public productosDb;
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: Config.FIREBASE_PROJECT_ID,
        privateKey: Config.FIREBASE_PRIVATE_KEY,
        clientEmail: Config.FIREBASE_CLIENT_EMAIL,
      }),
    });
    const db = admin.firestore();
    logger.info('Base de datos firebase configurada');
    this.productosDb = db.collection('productos');
    this.get()
      .then(productos => {
        if (productos.length === 0) {
          const batch = db.batch();
          (productosMock as IItem[]).map(product => {
            product.timestamp = moment().format('DD/MM/YYYY HH:mm:ss');
            const docRef = this.productosDb.doc();
            batch.set(docRef, product);
          });
          batch.commit().then(() => logger.info('Productos agregados'));
        }
      })
      .catch(e => logger.error(e));
  }

  async get(id?: string): Promise<IItem[] | IItem> {
    try {
      let output: IItem[] | IItem = [];
      if (id) {
        const data = await this.productosDb.doc(id).get();
        const producto = data.data();
        if (producto) {
          output = {
            id: data.id,
            ...producto,
          } as IItem;
        } else {
          return output[0];
        }
      } else {
        const result = await this.productosDb.get();
        const productos = result.docs;
        output = productos.map(product => {
          const productData = product.data();
          return {
            id: product.id,
            ...productData,
          };
        }) as IItem[];
      }
      return output;
    } catch (e) {
      throw { error: e, message: 'Hubo un problema al cargar los productos' };
    }
  }

  async save(data: IItem): Promise<IItem> {
    try {
      data.timestamp = moment().format('DD/MM/YYYY HH:mm:ss');
      const productDocumentRef = await this.productosDb.add({
        ...data,
      });
      const productCreatedId = productDocumentRef.id;
      const productCreated = await this.get(productCreatedId);
      return productCreated as IItem;
    } catch (e) {
      throw { error: e, message: 'No se pudo guardar el producto' };
    }
  }

  async update(id: string, producto: IItem): Promise<IItem> {
    try {
      const productToUpdate = await this.get(id);
      if (productToUpdate) {
        await this.productosDb.doc(id).update(producto);
        const productUpdated = await this.get(id);
        return productUpdated as IItem;
      } else {
        throw new NotFound(404, 'El producto que desea actualizar no existe');
      }
    } catch (e) {
      if (e instanceof NotFound) {
        throw e;
      } else {
        throw { error: e, message: 'No se pudo actualizar el producto' };
      }
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const productToDelete = await this.get(id);
      if (productToDelete) {
        await this.productosDb.doc(id).delete();
      } else {
        throw new NotFound(404, 'El producto que desea eliminar no existe');
      }
    } catch (e) {
      if (e instanceof NotFound) {
        throw e;
      } else {
        throw { error: e, message: 'No se pudo actualizar el producto' };
      }
    }
  }

  async query(options: IItemQuery): Promise<IItem[]> {
    let query: firestore.Query<firestore.DocumentData> = this.productosDb;
    let productos: IItem[] = [];

    try {
      if (options.nombre) {
        query = query.where('nombre', '==', options.nombre);
      }
      if (options.codigo) {
        query = query.where('codigo', '==', options.codigo);
      }
      if (
        (options.minPrice || options.maxPrice) &&
        (options.minStock || options.maxStock)
      ) {
        if (options.minPrice) {
          query = query.where('precio', '>=', options.minPrice);
        }
        if (options.maxPrice) {
          query = query.where('precio', '<=', options.maxPrice);
        }

        const productsSnapshot = await query.get();
        productsSnapshot.forEach(doc => {
          const id = doc.id;
          const data = doc.data();
          const product = {
            id,
            ...data,
          };
          productos.push(product as IItem);
        });

        if (options.minStock) {
          productos = productos.filter(
            product => product.stock >= (options.minStock as number),
          );
        }
        if (options.maxStock) {
          productos = productos.filter(
            product => product.stock <= (options.maxStock as number),
          );
        }
      } else {
        if (options.minPrice) {
          query = query.where('precio', '>=', options.minPrice);
        }
        if (options.maxPrice) {
          query = query.where('precio', '<=', options.maxPrice);
        }
        if (options.minStock) {
          query = query.where('stock', '>=', options.minStock);
        }
        if (options.maxStock) {
          query = query.where('stock', '<=', options.maxStock);
        }

        const productsSnapshot = await query.get();
        productsSnapshot.forEach(doc => {
          const id = doc.id;
          const data = doc.data();
          const product = {
            id,
            ...data,
          };
          productos.push(product as IItem);
        });
      }

      return productos;
    } catch (e) {
      throw { error: e, message: 'Hubo un error en la búsqueda' };
    }
  }
}
