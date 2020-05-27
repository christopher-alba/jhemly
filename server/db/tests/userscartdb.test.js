const knex = require('knex')
const config = require('../../../knexfile').test
const testDb = knex(config)

const db = require('../userscartdb')

beforeAll(() => testDb.migrate.latest())
beforeEach(() => testDb.seed.run())

test('test that getAll works', () => {
  return db.getAll(testDb)
    .then(items => expect(items).toHaveLength(3))
})

test('test that getUserCart works', () => {
  return db.getUserCart(1, testDb)
    .then(items => expect(items).toHaveLength(1))
})

test('test that addCartItem works', () => {
  return db.addCartItem({ user_id: 1, product_id: 2 }, testDb)
    .then(items => expect(items).toHaveLength(2))
})

test('test that deleteCartItem works', () => {
  return db.deleteCartItem(1, 1, testDb)
    .then(() => {
      return testDb('users_cart')
        .where('user_id', 1)
        .select()
    })
    .then(items => expect(items).toHaveLength(0))
})

test('test that clearUserCart works', () => {
  return db.clearUserCart(1, testDb)
    .then(() => testDb('users_cart').where('user_id', 1).select())
    .then(items => expect(items).toHaveLength(0))
})
