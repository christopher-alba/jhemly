const connection = require('./index')

module.exports = {
  getAll,
  getUserCart,
  deleteCartItem,
  clearUserCart,
  addCartItem
}

function getAll (db = connection) {
  return db('users_cart')
    .select()
    .catch(err => errorHandler('getAll', err))
}

function getUserCart (id, db = connection) {
  return db('users_cart')
    .where('user_id', id)
    .select()
    .catch(err => errorHandler('getUserCart', err))
}

function addCartItem (item, db = connection) {
  return db('users_cart')
    .insert({ ...item })
    .then(() => {
      return db('users_cart')
        .where('user_id', item.user_id)
        .select()
    })
    .catch(err => errorHandler('addCartItem', err))
}
function deleteCartItem (userId, productId, db = connection) {
  return db('users_cart')
    .where({ user_id: userId, product_id: productId })
    .del()
    .catch(err => errorHandler('deleteCartItem', err))
}

function clearUserCart (id, db = connection) {
  return db('users_cart')
    .where('user_id', id)
    .del()
    .catch(err => errorHandler('clearUserCart', err))
}

function errorHandler (location, error) {
  // eslint-disable-next-line no-console
  console.log(`There is an error in ${location} in userscartdb.js \n ${error.message}`)
}
