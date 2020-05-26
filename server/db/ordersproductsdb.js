const connection = require('./index')

module.exports = {
  getAll,
  getByOrderId,
  deleteOrderItem,
  addOrderItem
}

function getAll (db = connection) {
  return db('orders_products')
    .select()
    .catch(err => errorHandler('getAll', err))
}

function getByOrderId (id, db = connection) {
  return db('orders_products')
    .where('order_id', id)
    .select()
    .catch(err => errorHandler('getByOrderId', err))
}

function addOrderItem (item, db = connection) {
  return db('orders_products')
    .insert({ ...item })
    .then(() => db('orders_products').where('order_id', item.order_id).select())
    .catch(err => errorHandler('addOrderItem', err))
}

function deleteOrderItem (orderId, productId, db = connection) {
  return db('orders_products')
    .where({ order_id: orderId, product_id: productId })
    .del()
    .catch(err => errorHandler('deleteOrder', err))
}

function errorHandler (location, error) {
  // eslint-disable-next-line no-console
  console.log(`There is an error in ${location} in ordersproductsdb.js \n ${error.message}`)
}
