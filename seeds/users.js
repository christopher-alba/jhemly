exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { user_id: 1, user_name: 'username1', user_picture: 'a picture1', email: 'randomemail1@email.com', mailing_address: '1randomstreet' },
        { user_id: 2, user_name: 'username2', user_picture: 'a picture2', email: 'randomemail2@email.com', mailing_address: '2randomstreet' },
        { user_id: 3, user_name: 'username3', user_picture: 'a picture3', email: 'randomemail3@email.com', mailing_address: '3randomstreet' },
        { user_id: 4, user_name: 'username4', user_picture: 'a picture4', email: 'randomemail4@email.com', mailing_address: '4randomstreet' },
        { user_id: 5, user_name: 'username5', user_picture: 'a picture5', email: 'randomemail5@email.com', mailing_address: '5randomstreet' },
        { user_id: 6, user_name: 'username6', user_picture: 'a picture6', email: 'randomemail6@email.com', mailing_address: '6randomstreet' }
      ])
    })
}
