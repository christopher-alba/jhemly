exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users_cart').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_cart').insert([
        { user_id: 1, product_id: 1 },
        { user_id: 2, product_id: 1 },
        { user_id: 3, product_id: 1 }
      ])
    })
}
