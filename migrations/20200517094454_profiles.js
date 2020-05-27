exports.up = function (knex) {
  return knex.schema.createTable('profiles', (table) => {
    table.increments('profile_id').primary()
    table.integer('user_id').references('users.user_id').unique()
    table.string('user_name').unique()
    table.string('profile_image')
    table.string('mailing_address')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('profiles')
}
