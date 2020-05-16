exports.up = function (knex) {
  return knex.schema.createTable('products_categories', table => {
    table.integer('product_id').references('products.product_id')
    table.integer('category_id').references('categories.category_id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('products_categories')
}
