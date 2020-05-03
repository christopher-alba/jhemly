exports.seed = function (knex) {
  // Inserts seed entries
  return knex('products').insert([
    { product_id: 1, product_name: 'productname1', product_picture: 'productpicture1', product_price: 0.99, favourites_count: 1, size_id: 1 },
    { product_id: 2, product_name: 'productname2', product_picture: 'productpicture2', product_price: 0.99, favourites_count: 2, size_id: 2 },
    { product_id: 3, product_name: 'productname3', product_picture: 'productpicture3', product_price: 0.99, favourites_count: 3, size_id: 3 },
    { product_id: 4, product_name: 'productname4', product_picture: 'productpicture4', product_price: 0.99, favourites_count: 4, size_id: 4 },
    { product_id: 5, product_name: 'productname5', product_picture: 'productpicture5', product_price: 0.99, favourites_count: 5, size_id: 5 },
    { product_id: 6, product_name: 'productname6', product_picture: 'productpicture6', product_price: 0.99, favourites_count: 6, size_id: 6 }

  ])
}
