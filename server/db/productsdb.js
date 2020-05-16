const connection = require('./index')

module.exports = {
  getAll,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct
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

function addProduct (product, db = connection) {

  return db('products')
    .insert({ ...product })
}

function updateProduct (updates, id, db = connection) {
  return db('products')
    .where('product_id', id)
    .update({ ...updates })
}

function deleteProduct (id, db = connection) {
  return db('products')
    .where('product_id', id)
    .del()
}
