const knex = require('knex')
const config = require('../../../knexfile').test
const testDb = knex(config)

const db = require('../categoriesdb')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

test('test getAll works', () => {
  return db.getAll(testDb)
    .then(cats => expect(cats).toHaveLength(4))
})
