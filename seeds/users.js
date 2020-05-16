exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { user_id: 1, email: 'randomemail1@email.com', password: '123456' },
        { user_id: 2, email: 'randomemail2@email.com', password: '123456' },
        { user_id: 3, email: 'randomemail3@email.com', password: '123456' },
        { user_id: 4, email: 'randomemail4@email.com', password: '123456' },
        { user_id: 5, email: 'randomemail5@email.com', password: '123456' },
        { user_id: 6, email: 'randomemail6@email.com', password: '123456' }

      ])
    })
}
