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
