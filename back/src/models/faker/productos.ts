import { IItem, IItemQuery } from 'common/interfaces';
import { v4 as uuidv4 } from 'uuid';
import faker from 'faker';
import moment from 'moment';
import { NotFound } from 'errors';

export class ProductosModelFaker {
  private data: IItem[];
  constructor() {
    this.data = [];
  }

  generateProducts(qty = 10): IItem[] {
    const newProducts = [];
    for (let i = 0; i < qty; i++) {
      newProducts.push({
        id: uuidv4(),
        nombre: faker.commerce.productName(),
        descripcion: faker.commerce.productDescription(),
        codigo:
          'ECOM-' +
          faker.fake(
            '{{datatype.number({"min": 1000, "max": 9999})}}-{{datatype.number({"min": 1000, "max": 9999})}}'
          ),
        precio: Number(faker.commerce.price()),
        foto: faker.image.imageUrl(),
        timestamp: moment(faker.date.recent()).format('DD/MM/YYYY HH:mm:ss'),
        stock: faker.datatype.number(200),
      });
    }
    return newProducts;
  }

  async get(id?: string): Promise<IItem | IItem[]> {
    try {
      if (id) return this.data.find((item: IItem) => item.id == id) as IItem;
      this.data = this.generateProducts();
      return this.data;
    } catch (e) {
      throw { error: e, message: 'Hubo un problema al cargar el producto' };
    }
  }

  async save(producto: IItem): Promise<IItem> {
    try {
      this.data.push(producto);
      return producto;
    } catch (e) {
      throw { error: e, message: 'No se pudo guardar el producto' };
    }
  }

  async update(id: string, data: IItem): Promise<IItem> {
    try {
      const index = this.data.findIndex((aResource) => aResource.id === id);
      if (index) {
        const recursoViejo = this.data[index];
        const recursoNuevo = { ...data };

        const recursoActualizado = { ...recursoViejo, ...recursoNuevo };
        this.data.splice(index, 1, recursoActualizado);
        return recursoActualizado;
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
    const index = this.data.findIndex((aResource) => aResource.id == id);
    if (index) {
      this.data.splice(index, 1);
    } else {
      throw new NotFound('El producto que desea eliminar no existe');
    }
  }

  async query(options: IItemQuery): Promise<IItem[]> {
    type Conditions = (aProduct: IItem) => boolean;
    const query: Conditions[] = [];

    if (options.cant || options.cant === 0) {
      this.data = this.generateProducts(options.cant);
    }

    if (options.nombre)
      query.push((aProduct: IItem) => aProduct.nombre == options.nombre);

    if (options.codigo)
      query.push((aProduct: IItem) => aProduct.codigo == options.codigo);

    if (options.minPrice)
      query.push(
        (aProduct: IItem) => aProduct.precio >= (options.minPrice as number)
      );

    if (options.maxPrice)
      query.push(
        (aProduct: IItem) => aProduct.precio <= (options.maxPrice as number)
      );

    if (options.minStock)
      query.push(
        (aProduct: IItem) => aProduct.stock >= (options.minStock as number)
      );

    if (options.maxStock)
      query.push(
        (aProduct: IItem) => aProduct.stock <= (options.maxStock as number)
      );
    
    const filteredProducts = this.data.filter((aProduct) =>
      query.every((condition) => condition(aProduct))
    );

    if (filteredProducts.length !== 0) return filteredProducts;
    else throw new NotFound('No hay productos');
  }
}
