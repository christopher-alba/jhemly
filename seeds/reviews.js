exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('reviews').del()
    .then(function () {
      // Inserts seed entries
      return knex('reviews').insert([
        { review_id: 1, user_id: 1, review_text: `You're beautiful1` },
        { review_id: 2, user_id: 1, review_text: `You're beautiful2` },
        { review_id: 3, user_id: 1, review_text: `You're beautiful3` },
        { review_id: 4, user_id: 1, review_text: `You're beautiful4` },
        { review_id: 5, user_id: 1, review_text: `You're beautiful5` }

      ])
    })
}
