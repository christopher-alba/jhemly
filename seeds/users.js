exports.seed = function (knex) {
  const bcrypt = require('bcrypt')
  // Deletes ALL existing entries

  return knex('users').del()
    .then(async function () {
      const password = await bcrypt.hash('123456', 10)
      // Inserts seed entries
      return knex('users').insert([
        { user_id: 1, email: 'randomemail1@email.com', password, admin: true },
        { user_id: 2, email: 'randomemail2@email.com', password },
        { user_id: 3, email: 'randomemail3@email.com', password },
        { user_id: 4, email: 'randomemail4@email.com', password },
        { user_id: 5, email: 'randomemail5@email.com', password },
        { user_id: 6, email: 'randomemail6@email.com', password }

      ])
    })
}
