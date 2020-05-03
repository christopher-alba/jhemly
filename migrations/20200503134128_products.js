exports.up = function (knex) {
  return knex.schema.createTable('products', table => {
    table.increments('product_id').primary()
    table.string('product_name')
    table.string('product_picture')
    table.decimal('price')
    table.integer('favourites_count')
    table.integer('size_id').references('sizes.size_id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('products')
}
