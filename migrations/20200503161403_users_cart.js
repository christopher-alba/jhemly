exports.up = function (knex) {
  return knex.schema.createTable('users_cart', table => {
    table.integer('user_id').references('users.user_id')
    table.integer('product_id').references('products.product_id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users_cart')
}
