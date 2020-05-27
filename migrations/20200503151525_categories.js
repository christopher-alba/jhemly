exports.up = function (knex) {
  return knex.schema.createTable('categories', table => {
    table.increments('category_id').primary()
    table.string('category_name')
    table.string('category_picture')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('categories')
}
