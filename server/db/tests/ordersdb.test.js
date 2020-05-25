const knex = require('knex')
const config = require('../../../knexfile').test
const testDb = knex(config)

const db = require('../ordersdb')

beforeAll(() => testDb.migrate.latest())
beforeEach(() => testDb.seed.run())

test('test if getAll works', () => {
  return db.getAll(testDb)
    .then(orders => expect(orders).toHaveLength(5))
})

test('test if getOrder works', () => {
  return db.getOrder(1, testDb)
    .then(order => expect(order.order_id).toBe(1))
})

test('test if getOrders works', () => {
  return db.getOrders(0, testDb)
    .then(orders => expect(orders).toHaveLength(2))
})

test('test if addOrder works', () => {
  return db.addOrder({}, testDb)
    .then(orders => expect(orders).toHaveLength(6))
})
