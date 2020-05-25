const connection = require('./index')

module.exports = {
  getAll,
  getOrder,
  getOrders,
  deleteOrder,
  addOrder
}

function getAll (db = connection) {
  return db('orders')
    .select()
    .catch(err => errorHandler('getAll', err))
}

function getOrder (orderId, db = connection) {
  return db('orders')
    .where('order_id', orderId)
    .select()
    .first()
    .catch(err => errorHandler('getOrder', err))
}

function getOrders (userId, db = connection) {
  return db('orders')
    .where('user_id', userId)
    .select()
    .catch(err => errorHandler('getOrders', err))
}

function addOrder (order, db = connection) {
  return db('orders')
    .insert({ ...order })
    .then(() => db('orders').select())
    .catch(err => errorHandler('addOrder', err))
}

function deleteOrder (orderId, db = connection) {
  return db('orders')
    .where('order_id', orderId)
    .del()
    .then(() => orderId)
    .catch(err => errorHandler('deleteOrder', err))
}

function errorHandler (location, error) {
  // eslint-disable-next-line no-console
  console.log(`There is an error in ${location} in ordersdb.js \n ${error.message}`)
}
