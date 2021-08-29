import { IMesssage } from 'common/interfaces';
import knex, { Knex } from 'knex';
import dbConfig from './../../knexfile';

class SqlLiteSb {
  public connection: Knex;
  constructor() {
    const environment = process.env.NODE_ENV || 'local';
    console.log(`SETTING ${environment} DB`);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const options = dbConfig[environment];
    this.connection = knex(options);
  }

  init() {
    this.connection.schema.hasTable('mensajes').then((exists) => {
      if (!exists) {
        this.connection.schema
          .createTable('mensajes', (messagesTable) => {
            messagesTable.increments();
            messagesTable.string('email').notNullable();
            messagesTable.string('text').notNullable();
            messagesTable.timestamp('date').defaultTo(this.connection.fn.now());
          })
          .then(() => {
            console.log('Tabla mensajes creada');
        });
      }
    });
  }

  get(tableName: string, id?: number) {
    if (id) return this.connection(tableName).where('id', id);
    return this.connection(tableName);
  }

  async create(tableName: string, data: IMesssage) {
    const newMessageId = await this.connection(tableName).insert(data);
    return this.get(tableName, newMessageId[0]);
  }
}

export const sqlLiteDbService = new SqlLiteSb();
