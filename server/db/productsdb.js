/* eslint-disable no-console */
const connection = require('./index')

module.exports = {
  getAll,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct
}

function getAll (db = connection) {
  return db('products')
    .select()
    .catch(err => errorHandler(err, 'getAll'))
}

function getProduct (id, db = connection) {
  return db('products')
    .where('product_id', id)
    .select()
    .first()
    .catch(err => errorHandler(err, 'getProduct'))
}

function addProduct (product, db = connection) {
  return db('products')
    .insert({ ...product })
    .then(() => {
      return db('products')
        .select()
    })
    .catch(err => errorHandler(err, 'addProduct'))
}

function updateProduct (updates, id, db = connection) {
  return db('products')
    .where('product_id', id)
    .update({ ...updates })
    .then(() => {
      return db('products')
        .where('product_id', id)
        .select()
        .first()
    })
    .catch(err => errorHandler(err, 'updateProduct'))
}

function deleteProduct (id, db = connection) {
  return db('products')
    .where('product_id', id)
    .del()
    .then(() => {
      return id
    })
    .catch(err => errorHandler(err, 'deleteProduct'))
}

function errorHandler (err, location) {
  console.log(`You have an error in ${location} function inside productsdb. \n ${err.message}`)
}
