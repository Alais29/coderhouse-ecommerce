// Update with your config settings.

export default {
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'coder_ecommerce',
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds',
    },
    pool: { min: 0, max: 7 },
  },

  local: {
    client: 'sqlite3',
    connection: { filename: './mensajes.sqlite' },
    useNullAsDefault: true,
  },
};
