exports.up = function (knex) {
  return knex.schema.createTable('sizes', table => {
    table.increments('size_id').primary()
    table.string('size_name')
    table.decimal('min_size')
    table.decimal('max_size')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('sizes')
}
