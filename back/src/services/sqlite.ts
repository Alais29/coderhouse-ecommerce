import { IMesssage } from '/common/interfaces';
import knex, { Knex } from 'knex';
import dbConfig from '/../knexfile';

class SqlLiteSb {
  public connection: Knex;
  public messages: IMesssage[];
  constructor() {
    const environment = 'local';
    console.log(`SETTING ${environment} DB`);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const options = dbConfig[environment];
    this.connection = knex(options);
    this.messages = [
      { email: 'juan@gmail.com', text: '¡Hola! ¿Que tal?' },
      { email: 'pedro@gmail.com', text: '¡Muy bien! ¿Y vos?' },
      { email: 'ana@gmail.com', text: '¡Genial!' },
    ];
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
            this.create('mensajes', this.messages);
            console.log('Mensajes agregados');
          });
      }
    });
  }

  get(tableName: string, id?: number) {
    if (id) return this.connection(tableName).where('id', id);
    return this.connection(tableName);
  }

  async create(tableName: string, data: IMesssage | IMesssage[]) {
    const newMessageId = await this.connection(tableName).insert(data);
    return this.get(tableName, newMessageId[0]);
  }
}

export const sqlLiteDbService = new SqlLiteSb();
