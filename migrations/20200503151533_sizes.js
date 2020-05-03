exports.up = function (knex) {
  return knex.schema.createTable('sizes', table => {
    table.increments('size_id').primary()
    table.decimal('min_size')
    table.decimal('max_size')
    table.string('scale')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('sizes')
}
