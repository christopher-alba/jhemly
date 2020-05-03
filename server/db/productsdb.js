const connection = require('./index')

module.exports = {
  getAll,
  getProduct,
  addProduct
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
  console.log(product);
  
  return db('products')
    .insert({ ...product })
}
