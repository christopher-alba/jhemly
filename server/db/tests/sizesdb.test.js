/* eslint-disable camelcase */
const knex = require('knex')
const config = require('../../../knexfile').test
const testDb = knex(config)

const db = require('../sizesdb')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

test('test getSizes works', () => {
  return db.getSizes(1, testDb)
    .then(sizes => expect(sizes).toHaveLength(1))
})

test('test addSize works', () => {
  return db.addSize({}, testDb)
    .then(sizes => expect(sizes).toHaveLength(10))
})

test('test updateSize works', () => {
  const updates = {
    product_id: 1
  }
  return db.updateSize(updates, 7, testDb)
    .then(size => expect(size.product_id).toBe(1))
})

test('test deleteSize works', () => {
  return db.deleteSize(7, testDb)
    .then(() => {
      return testDb('sizes').select()
    })
    .then(sizes => expect(sizes).toHaveLength(8))
})
