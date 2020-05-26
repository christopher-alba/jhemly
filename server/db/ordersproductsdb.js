const connection = require('./index')

module.exports = {
  getAll
}

function getAll (db = connection) {
  return db('orders_products')
    .select()
    .catch(err => errorHandler('getAll', err))
}

function errorHandler (location, error) {
  // eslint-disable-next-line no-console
  console.log(`There is an error in ${location} in ordersproductsdb.js \n ${error.message}`)
}
