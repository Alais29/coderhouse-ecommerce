
exports.up = function(knex) {
  return knex.schema.hasTable('productos').then((exists) => {
    if (!exists) {
      console.log('NO EXISTE LA TABLA productos. VAMOS A CREARLA');
      knex.schema
        .createTable('productos', (productosTable) => {
          productosTable.increments();
          productosTable.string('nombre').notNullable();
          productosTable.string('descripcion').notNullable();
          productosTable.string('codigo').notNullable();
          productosTable.decimal('precio', 5, 2).notNullable();
          productosTable.string('foto').notNullable();
          productosTable.timestamp('timestamp').defaultTo(knex.fn.now());
          productosTable.integer('stock').notNullable();
        })
        .then(() => {
          console.log('DONE');
        });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('productos');
};
