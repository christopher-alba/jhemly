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

test('test addCategory works', () => {
  return db.addCategory({}, testDb)
    .then(cats => expect(cats).toHaveLength(5))
})

test('test deleteCategory works', () => {
  return db.deleteCategory(1, testDb)
    .then(() => testDb('categories').select())
    .then(cats => expect(cats).toHaveLength(3))
})
