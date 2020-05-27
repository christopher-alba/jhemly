exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('orders').del()
    .then(function () {
      // Inserts seed entries
      return knex('orders').insert([
        { order_id: 1, user_id: 0 },
        { order_id: 2, user_id: 0 },
        { order_id: 3, user_id: 1 },
        { order_id: 4, user_id: 1 },
        { order_id: 5, user_id: 2 }
      ])
    })
}
