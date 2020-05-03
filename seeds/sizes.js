exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('sizes').del()
    .then(function () {
      // Inserts seed entries
      return knex('sizes').insert([
        { size_id: 1, scale: 'mm', min_size: 20.5, max_size: 23.6, product_id: 1 },
        { size_id: 2, scale: 'cm', min_size: 20.5, max_size: 23.6, product_id: 2 },
        { size_id: 3, scale: 'inches', min_size: 20.5, max_size: 23.6, product_id: 3 },
        { size_id: 4, scale: 'cm', min_size: 25.5, max_size: 29.6, product_id: 4 },
        { size_id: 5, scale: 'cm', min_size: 24.5, max_size: 33.6, product_id: 5 },
        { size_id: 6, scale: 'cm', min_size: 24.5, max_size: 33.6, product_id: 6 },
        { size_id: 7, scale: 'cm', min_size: 24.5, max_size: 33.6 },
        { size_id: 8, scale: 'cm', min_size: 24.5, max_size: 33.6 },
        { size_id: 9, scale: 'cm', min_size: 24.5, max_size: 33.6 }
      ])
    })
}
