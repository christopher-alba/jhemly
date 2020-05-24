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
