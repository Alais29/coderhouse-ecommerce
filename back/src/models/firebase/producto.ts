import { IItem } from 'common/interfaces';
import { NotFound } from 'errors';
import admin, { ServiceAccount } from 'firebase-admin';
import { productosMock } from 'mocks/products';
import moment from 'moment';
import serviceAccount from './../../../firebase.json';

export class ProductosModelFirebase {
  public productosDb;
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as ServiceAccount)
    });
    const db = admin.firestore();
    console.log('Base de datos firebase configurada');
    this.productosDb = db.collection('productos');
    this.get()
      .then((productos) => {
        if (productos.length === 0) {
          const batch = db.batch();
          (productosMock as IItem[]).map((product) => {
            product.timestamp = moment().format('DD/MM/YYYY HH:mm:ss');
            const docRef = this.productosDb.doc();
            batch.set(docRef, product);
          });
          batch.commit().then(() => console.log('Productos agregados'));
        }
      })
      .catch((e) => console.log(e));
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
            ...producto
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
            ...productData
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
        ...data
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
        throw new NotFound('El producto que desea actualizar no existe');
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
        throw new NotFound('El producto que desea eliminar no existe');
      }
    } catch (e) {
      if (e instanceof NotFound) {
        throw e;
      } else {
        throw { error: e, message: 'No se pudo actualizar el producto' };
      }
    }
  }
}