/* eslint-disable camelcase */
const knex = require('knex')
const config = require('../../../knexfile').test
const testDb = knex(config)

const db = require('../usersdb')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})
test('getAll returns all the users', () => {
  return db.getAll(testDb)
    .then(users => expect(users).toHaveLength(6))
})
test('addUser adds a new user', () => {
  const user = {
    user_name: 'chris',
    user_picture: 'a picture1',
    email: 'randomemail1@email.com',
    mailing_address: '1randomstreet' }
  return db.addUser(user, testDb)
    .then(() => {
      return db.getAll(testDb)
        .then(users => {
          expect(users).toHaveLength(7)
        })
    })
})

test('deleteUser deletes the correct user', () => {
  return db.deleteUser(1, testDb)
    .then(() => {
      return db.getAll(testDb)
        .then(users => {
          expect(users).toHaveLength(5)
        })
    })
})

test('getUser gets the correct user', () => {
  return db.getUser(1, testDb)
    .then(user => {
      const { user_id } = user
      expect(user_id).toBe(1)
    })
})

test('updateUser updates the user', () => {
  const updates = {
    user_name: 'Chris'
  }
  return db.updateUser(updates, 1, testDb)
    .then(() => {
      return db.getUser(1, testDb)
        .then(user => expect(user.user_name).toMatch('Chris'))
    })
})
