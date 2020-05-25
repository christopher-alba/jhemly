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
