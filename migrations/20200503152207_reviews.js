exports.up = function (knex) {
  return knex.schema.createTable('reviews', table => {
    table.increments('review_id').primary()
    table.integer('user_id')
    table.string('review_text')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('reviews')
}
