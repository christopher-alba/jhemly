const knex = require('knex')
const config = require('../../../knexfile').test
const testDb = knex(config)

const db = require('../ordersproductsdb')

beforeAll(() => testDb.migrate.latest())
beforeEach(() => testDb.seed.run())

test('test getAll works', () => {
  return db.getAll(testDb)
    .then(items => expect(items).toHaveLength(3))
})

test('test getByOrderId', () => {
  return db.getByOrderId(1, testDb)
    .then(items => expect(items).toHaveLength(3))
})

test('test addOrderItem', () => {
  return db.addOrderItem({ order_id: 1 }, testDb)
    .then(() => {
      return testDb('orders_products').select()
    })
    .then(allItems => expect(allItems).toHaveLength(4))
})
