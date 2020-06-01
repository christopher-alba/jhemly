const connection = require('./index')

module.exports = {
  getAll,
  getProductCats,
  addProductCat,
  deleteProductCat
}
function getAll (db = connection) {
  return db('products_categories')
    .select()
    .catch(err => errorHandler('getAll', err))
}

function getProductCats (id, db = connection) {
  return db('products_categories')
    .where('product_id', id)
    .select()
    .catch(err => errorHandler('getProductCats', err))
}

function addProductCat (product, db = connection) {
  return db('products_categories')
    .insert({ ...product })
    .then(() => {
      return db('products_categories').select()
    })
    .catch(err => errorHandler('addProductCat', err))
}

function deleteProductCat (productId, categoryId, db = connection) {
  return db('products_categories')
    .where({
      product_id: productId,
      category_id: categoryId
    })
    .del()
    .catch(err => errorHandler('deleteProductCat', err))
}

function errorHandler (location, error) {
  // eslint-disable-next-line no-console
  console.log(`There is an error in ${location} inside productscategoriesdb.js. \n ${error.message}`)
}
