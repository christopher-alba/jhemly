const connection = require('./index')

module.exports = {
  getAll,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory
}

function getAll (db = connection) {
  return db('categories').select()
    .catch(err => errorHandler(err, 'getAll'))
}

function getCategory (id, db = connection) {
  return db('categories')
    .where('category_id', id)
    .select()
    .first()
    .catch(err => errorHandler(err, 'getCategory'))
}

function addCategory (Category, db = connection) {
  return db('categories')
    .insert({ ...Category })
    .then(() => {
      return db('categories').select()
    })
    .catch(err => errorHandler(err, 'addCategory'))
}

function updateCategory (updates, id, db = connection) {
  return db('categories')
    .where('category_id', id)
    .update({ ...updates })
    .then(() => {
      return db('categories')
        .where('category_id', id)
        .select()
        .first()
    })
    .catch(err => errorHandler(err, 'updateCategory'))
}

function deleteCategory (id, db = connection) {
  return db('categories')
    .where('category_id', id)
    .del()
    .then(() => id)
    .catch(err => errorHandler(err, 'deleteCategory'))
}

function errorHandler (err, location) {
  return `There is a database function error in ${location} in categoriesdb.js. \n ${err.message}`
}
