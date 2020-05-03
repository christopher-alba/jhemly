const connection = require('./index')

module.exports = {
  getAll,
  getProduct
}

function getAll (db = connection) {
  return db('products').select()
}

function getProduct (id, db = connection) {
  return db('products')
    .where('product_id', id)
    .select()
    .first()
}
