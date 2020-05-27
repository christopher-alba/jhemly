const connection = require('./index')

module.exports = {
  getAll,
  addCategory,
  deleteCategory
}

function getAll (db = connection) {
  return db('categories').select()
    .catch(err => errorHandler(err, 'getAll'))
}

function addCategory (Category, db = connection) {
  return db('categories')
    .insert({ ...Category })
    .then(() => {
      return db('categories').select()
    })
    .catch(err => errorHandler(err, 'addCategory'))
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
