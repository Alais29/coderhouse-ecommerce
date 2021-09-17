import { IItem } from 'common/interfaces';
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
          productosMock.map((product) => {
            const docRef = this.productosDb.doc();
            batch.set(docRef, product);
          });
          batch.commit().then(() => console.log('Productos agregados'));
        }
      })
      .catch((e) => console.log(e));
  }

  async get(id?: string): Promise<IItem[] | IItem> {
    let output: IItem[] | IItem = [];
    if (id) {
      const data = await this.productosDb.doc(id).get();
      const producto = data.data();
      output = {
        id: data.id,
        ...producto
      } as IItem;
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
  }

  async save(data: IItem): Promise<IItem> {
    data.timestamp = moment().format('DD/MM/YYYY HH:mm:ss');
    const productDocumentRef = await this.productosDb.add({
      ...data
    });
    const productCreatedId = productDocumentRef.id;
    const productCreated = await this.get(productCreatedId);
    return productCreated as IItem;
  }

  async update(id: string, producto: IItem): Promise<IItem> {
    await this.productosDb.doc(id).update(producto);
    const productUpdated = await this.get(id);
    return productUpdated as IItem;
  }

  async delete(id: string): Promise<void> {
    await this.productosDb.doc(id).delete();
  }
}