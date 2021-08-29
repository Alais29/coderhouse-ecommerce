import { IItem } from 'common/interfaces.js';
import knex, { Knex } from 'knex';
import dbConfig from './../../knexfile';

class MySqlDb {
  public connection: Knex;
  constructor() {
    const environment = process.env.NODE_ENV || 'development';
    console.log(`SETTING ${environment} DB`);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const options = dbConfig[environment];
    this.connection = knex(options);
  }

  init() {
    this.connection.schema.hasTable('productos').then((exists) => {
      if (!exists) {
        this.connection.schema
          .createTable('productos', (productosTable) => {
            productosTable.increments();
            productosTable.string('nombre').notNullable();
            productosTable.string('descripcion').notNullable();
            productosTable.string('codigo').notNullable();
            productosTable.decimal('precio', 5, 2).notNullable();
            productosTable.string('foto').notNullable();
            productosTable.timestamp('timestamp').defaultTo(this.connection.fn.now());
            productosTable.integer('stock').notNullable();
          })
          .then(() => {
            console.log('Tabla productos creada');
          });
      }
    });
  }

  get(tableName: string, id?: number) {
    if (id) return this.connection(tableName).where('id', id);
    return this.connection(tableName);
  }

  async create(tableName: string, data: IItem) {
    const newProductId = await this.connection(tableName).insert(data);
    return this.get(tableName, newProductId[0]);
  }

  async update(tableName: string, id: number, data: IItem) {
    await this.connection(tableName).where('id', id).update(data);
    return this.get(tableName, id);
  }

  delete(tableName: string, id: number) {
    return this.connection(tableName).where('id', id).del();
  }
}

export const mySqlDbService = new MySqlDb();