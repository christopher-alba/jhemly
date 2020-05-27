exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        { category_id: 1, category_name: 'rings' },
        { category_id: 2, category_name: 'earrings' },
        { category_id: 3, category_name: 'necklaces' },
        { category_id: 4, category_name: 'bracelets' }
      ])
    })
}
