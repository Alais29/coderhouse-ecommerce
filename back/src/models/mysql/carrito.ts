import knex, { Knex } from 'knex';
import { IKnex } from 'common/interfaces/others';
import { IItem } from 'common/interfaces/products';
import { NotFound, RepeatedProductInCart } from 'errors';
import dbConfig from './../../../knexfile';
import { logger } from 'services/logger';

export class CarritosModelMySql {
  private connection: Knex;
  constructor(dbType: 'mysql' | 'sqlite') {
    const environment =
      dbType === 'mysql'
        ? process.env.NODE_ENV || 'development'
        : 'development2';
    const configDb: IKnex = dbConfig;
    const options = configDb[environment];
    this.connection = knex(options);
    logger.info(`BD MySQL ${environment} configurada`);
    this.connection.schema.hasTable('carrito').then(exists => {
      if (!exists) {
        this.connection.schema
          .createTable('carrito', carritoTable => {
            carritoTable.increments();
            carritoTable.string('nombre').notNullable();
            carritoTable.string('descripcion').notNullable();
            carritoTable.string('codigo').notNullable();
            carritoTable.decimal('precio', 5, 2).notNullable();
            carritoTable.string('foto').notNullable();
            carritoTable
              .timestamp('timestamp')
              .defaultTo(this.connection.fn.now());
            carritoTable.integer('stock').notNullable();
          })
          .then(() => {
            logger.info('Tabla carrito creada');
          })
          .catch(e => logger.error(e));
      }
    });
  }

  async get(id?: string): Promise<IItem | IItem[]> {
    try {
      if (id) {
        const producto = await this.connection('carrito').where(
          'id',
          Number(id),
        );
        return producto[0];
      }
      return this.connection('carrito');
    } catch (e) {
      throw { error: e, message: 'Hubo un problema al cargar los productos' };
    }
  }

  async save(id: string): Promise<IItem> {
    try {
      const productToAddInCart = await this.get(id);

      if (productToAddInCart) {
        throw new RepeatedProductInCart(
          400,
          'El producto que desea agregar ya se encuentra en el carrito',
        );
      } else {
        const productToAdd = await this.connection('productos').where(
          'id',
          Number(id),
        );
        if (productToAdd.length) {
          const productAddedId = await this.connection('carrito').insert(
            productToAdd[0],
          );
          const newProductAdded = await this.get(
            productAddedId[0] as unknown as string,
          );
          return newProductAdded as unknown as IItem;
        } else {
          throw new NotFound(404, 'El producto que deseas agregar no existe');
        }
      }
    } catch (e) {
      if (e instanceof NotFound || e instanceof RepeatedProductInCart) {
        throw e;
      } else {
        throw { error: e, message: 'No se pudo agregar el producto' };
      }
    }
  }

  async delete(id: string): Promise<IItem[]> {
    try {
      const productDeleted = await this.connection('carrito')
        .where('id', Number(id))
        .del();
      if (!productDeleted) {
        throw new NotFound(
          404,
          'El producto que desea eliminar no está en el carrito',
        );
      } else {
        const productsInCart = await this.get();
        return productsInCart as IItem[];
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
