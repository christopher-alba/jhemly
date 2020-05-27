/* eslint-disable camelcase */
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

test('addProduct returns the new array of products', () => {
  const product = {
    product_name: 'productname7',
    product_picture: 'productpicture7',
    product_price: 0.99,
    favourites_count: 7,
    size_id: 7 }
  return db.addProduct(product, testDb)
    .then(products => {
      expect(products).toHaveLength(7)
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

test('deleteProduct returns the id of the deleted product', () => {
  return db.deleteProduct(1, testDb)
    .then((id) => {
      expect(id).toEqual(1)
    })
})

test('getAll gets all the products', () => {
  return db.getAll(testDb)
    .then(products => {
      expect(products).toHaveLength(6)
    })
})

test('getProduct gets the correct product', () => {
  return db.getProduct(1, testDb)
    .then(product => {
      const { product_id } = product
      expect(product_id).toBe(1)
    })
})

test('updateProduct correctly updates a product', () => {
  const updates = {
    product_name: 'Oreos'
  }
  return db.updateProduct(updates, 1, testDb)
    .then(() => {
      return testDb('products').where('product_id', 1).select().first()
        .then(product => {
          const { product_name } = product
          expect(product_name).toMatch('Oreos')
        })
    })
})

test('updateProduct returns the new updated product', () => {
  const updates = {
    product_name: 'Oreos'
  }
  return db.updateProduct(updates, 1, testDb)
    .then(product => {
      const { product_name } = product
      expect(product_name).toMatch('Oreos')
    })
})
