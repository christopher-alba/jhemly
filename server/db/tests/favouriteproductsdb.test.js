const knex = require('knex')
const config = require('../../../knexfile').test
const testDb = knex(config)

const db = require('../favouriteproductsdb')

beforeAll(() => testDb.migrate.latest())
beforeEach(() => testDb.seed.run())

test('test getUserFavourites works', () => {
  return db.getUserFavourites(1, testDb)
    .then(favs => {
      expect(favs).toHaveLength(1)
    })
})

test('test addUserFavourite works', () => {
  return db.addUserFavourite({ user_id: 1, product_id: 2 }, testDb)
    .then(() => {
      return testDb('favourite_products')
        .where('user_id', 1)
        .select()
    })
    .then(favs => expect(favs).toHaveLength(2))
})

test('test deleteUserFavourite', () => {
  return db.deleteUserFavourite({ user_id: 1, product_id: 1 }, testDb)
    .then(() => {
      return testDb('favourite_products')
        .select()
    })
    .then(favs => expect(favs).toHaveLength(2))
})
