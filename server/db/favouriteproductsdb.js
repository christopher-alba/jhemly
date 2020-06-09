const connection = require('./index')

module.exports = {
  getUserFavourites,
  addUserFavourite,
  deleteUserFavourite
}

function getUserFavourites (id, db = connection) {
  return db('favourite_products')
    .where('user_id', id)
    .select()
    .catch(err => errorHandler('getUserFavourites', err))
}

function addUserFavourite (item, db = connection) {
  return db('favourite_products')
    .insert({ ...item })
    .catch(err => errorHandler('addUserFavourite', err))
}

function deleteUserFavourite (item, db = connection) {
  return db('favourite_products')
    .where({ ...item })
    .del()
    .catch(err => errorHandler('addUserFavourite', err))
}

function errorHandler (location, error) {
  // eslint-disable-next-line no-console
  console.log(`There is an error in ${location} in favouriteproductsdb.js. \n ${error.message}`)
}
