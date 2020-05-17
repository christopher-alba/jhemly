exports.up = function (knex) {
  return knex.schema.createTable('users', table => {
    table.increments('user_id').primary()
    table.string('email').unique()
    table.string('password')
    table.boolean('admin').defaultTo(false)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
