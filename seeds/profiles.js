exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('profiles').del()
    .then(function () {
      // Inserts seed entries
      return knex('profiles').insert([
        { profile_id: 1, user_id: 1, user_name: 'name1', profile_image: 'randomimage1', mailing_address: 'street1' },
        { profile_id: 2, user_id: 2, user_name: 'name2', profile_image: 'randomimage2', mailing_address: 'street2' },
        { profile_id: 3, user_id: 3, user_name: 'name3', profile_image: 'randomimage3', mailing_address: 'street3' },
        { profile_id: 4, user_id: 4, user_name: 'name4', profile_image: 'randomimage4', mailing_address: 'street4' },
        { profile_id: 5, user_id: 5, user_name: 'name5', profile_image: 'randomimage5', mailing_address: 'street5' },
        { profile_id: 6, user_id: 6, user_name: 'name6', profile_image: 'randomimage6', mailing_address: 'street6' }
      ])
    })
}
