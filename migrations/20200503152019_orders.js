exports.up = function (knex) {
  return knex.schema.createTable('orders', table => {
    table.increments('order_id').primary()
    table.integer('user_id').references('users.user_id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('orders')
}
