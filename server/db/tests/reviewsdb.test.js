const knex = require('knex')
const config = require('../../../knexfile').test
const testDb = knex(config)

const db = require('../reviewsdb')

beforeAll(() => {
  return testDb.migrate.latest()
})
beforeEach(() => {
  return testDb.seed.run()
})

test('test if getAll works', () => {
  return db.getAll(testDb)
    .then(reviews => expect(reviews).toHaveLength(5))
})

test('test if getReviews works', () => {
  return db.getReviews(1, testDb)
    .then(reviews => expect(reviews).toHaveLength(5))
})

test('test if addReview works', () => {
  return db.addReview({}, testDb)
    .then(reviews => expect(reviews).toHaveLength(6))
})
