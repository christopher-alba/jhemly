exports.up = function (knex) {
  return knex.schema.createTable('orders_products', table => {
    table.integer('order_id').references('orders.order_id')
    table.integer('product_id').references('products.product_id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('orders_products')
}
