import knex, { Knex } from 'knex';
import { IKnex } from 'common/interfaces/others';
import { IItem, IItemQuery } from 'common/interfaces/products';
import { NotFound } from 'errors';
import dbConfig from './../../../knexfile';
import { productosMock } from 'mocks/products';
import { logger } from 'services/logger';

export class ProductosModelMySql {
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
    this.connection.schema.hasTable('productos').then(exists => {
      if (!exists) {
        this.connection.schema
          .createTable('productos', productosTable => {
            productosTable.increments();
            productosTable.string('nombre').notNullable();
            productosTable.string('descripcion').notNullable();
            productosTable.string('codigo').notNullable();
            productosTable.decimal('precio', 5, 2).notNullable();
            productosTable.string('foto').notNullable();
            productosTable
              .timestamp('timestamp')
              .defaultTo(this.connection.fn.now());
            productosTable.integer('stock').notNullable();
          })
          .then(() => {
            logger.info('Tabla productos creada');
            this.connection('productos')
              .insert(productosMock)
              .then(() => logger.info('Productos agregados'))
              .catch(e => logger.error(e));
          })
          .catch(e => logger.error(e));
      }
    });
  }

  async get(id?: string): Promise<IItem | IItem[]> {
    try {
      if (id) {
        const producto = await this.connection('productos').where(
          'id',
          Number(id),
        );
        return producto[0];
      }
      return this.connection('productos');
    } catch (e) {
      throw { error: e, message: 'Hubo un problema al cargar los productos' };
    }
  }

  async save(producto: IItem): Promise<IItem> {
    try {
      const newProductId = await this.connection('productos').insert(producto);
      const newProduct = this.get(newProductId[0] as unknown as string);
      return newProduct as unknown as IItem;
    } catch (e) {
      throw { error: e, message: 'No se pudo guardar el producto' };
    }
  }

  async update(id: string, producto: IItem): Promise<IItem> {
    try {
      await this.connection('productos')
        .where('id', Number(id))
        .update(producto);
      const productUpdated = await this.get(id);

      if (productUpdated) {
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
      const productDeleted = await this.connection('productos')
        .where('id', Number(id))
        .del();
      if (!productDeleted) {
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
    try {
      const products = await this.connection('productos')
        .modify(queryBuilder => {
          if (options.nombre) {
            queryBuilder.where('nombre', options.nombre);
          }
        })
        .modify(queryBuilder => {
          if (options.codigo) {
            queryBuilder.where('codigo', options.codigo);
          }
        })
        .modify(queryBuilder => {
          if (options.minPrice) {
            queryBuilder.where('precio', '>=', options.minPrice);
          }
        })
        .modify(queryBuilder => {
          if (options.maxPrice) {
            queryBuilder.where('precio', '<=', options.maxPrice);
          }
        })
        .modify(queryBuilder => {
          if (options.minStock) {
            queryBuilder.where('stock', '>=', options.minStock);
          }
        })
        .modify(queryBuilder => {
          if (options.maxStock) {
            queryBuilder.where('stock', '<=', options.maxStock);
          }
        });

      return products;
    } catch (e) {
      throw { error: e, message: 'Hubo un error en la búsqueda' };
    }
  }
}
