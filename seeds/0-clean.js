exports.seed = function (knex, Promise) {
  const empty = table => () => knex(table).del()

  return empty('products_categories')()
    .then(empty('favourite_products'))
    .then(empty('orders_products'))
    .then(empty('users_cart'))
    .then(empty('categories'))
    .then(empty('sizes'))
    .then(empty('orders'))
    .then(empty('reviews'))
    .then(empty('products'))
    .then(empty('profiles'))
    .then(empty('users'))
}
