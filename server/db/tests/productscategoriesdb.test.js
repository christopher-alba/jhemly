const knex = require('knex')
const config = require('../../../knexfile').test
const testDb = knex(config)

const db = require('../productscategoriesdb')

beforeAll(() => testDb.migrate.latest())
beforeEach(() => testDb.seed.run())

test('test getAll works', () => {
  return db.getAll(testDb)
    .then(items => {
      expect(items).toHaveLength(4)
    })
})

test('test getProductCats works', () => {
  return db.getProductCats(1, testDb)
    .then(items => {
      expect(items).toHaveLength(1)
    })
})

test('test addProductCat works', () => {
  return db.addProductCat({}, testDb)
    .then(items => {
      expect(items).toHaveLength(5)
    })
})

test('test deleteProductCat works', () => {
  return db.deleteProductCat(1, 1, testDb)
    .then(() => {
      return testDb('products_categories').select()
    })
    .then(items => {
      expect(items).toHaveLength(3)
    })
})
