exports.up = function (knex) {
  return knex.schema.createTable('favourite_products', table => {
    table.integer('user_id').references('users.user_id')
    table.integer('prodcut_id').references('products.product_id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('favourite_products')
}
