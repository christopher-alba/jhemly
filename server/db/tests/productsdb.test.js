const knex = require('knex')
const config = require('../../../knexfile').test
const testDb = knex(config)

const db = require('../productsdb')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

test('addProduct adds a new product', () => {
  const product = {
    product_name: 'productname7',
    product_picture: 'productpicture7',
    product_price: 0.99,
    favourites_count: 7,
    size_id: 7 }
  return db.addProduct(product, testDb)
    .then(() => {
      return testDb('products').select()
        .then(products => {
          expect(products).toHaveLength(7)
        })
    })
})

test('deleteProduct deletes the correct product', () => {
  return db.deleteProduct(1, testDb)
    .then(() => {
      return testDb('products').select()
        .then(products => {
          expect(products).toHaveLength(5)
        })
    })
})