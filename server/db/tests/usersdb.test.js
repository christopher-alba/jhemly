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
    email: 'awsomegoo@email.com',
    password: '1randomstreet' }
  return db.addUser(user, testDb)
    .then(() => {
      return db.getAll(testDb)
        .then(users => {
          expect(users).toHaveLength(7)
        })
    })
})

test('addUser returns the new array of users', () => {
  const user = {
    email: 'awsomegoo@email.com',
    password: '1randomstreet' }
  return db.addUser(user, testDb)
    .then(users => {
      expect(users).toHaveLength(7)
    })
})
test('deleteUser deletes the correct user', () => {
  return db.deleteUser(1, testDb)
    .then(() => {
      return testDb('users').select()
        .then(users => {
          expect(users).toHaveLength(5)
        })
    })
})
test('deleteUser returns the id of the deleted user', () => {
  return db.deleteUser(1, testDb)
    .then((id) => {
      expect(id).toBe(1)
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
    email: 'chris@email.com'
  }
  return db.updateUser(updates, 1, testDb)
    .then(() => {
      return testDb('users').where('user_id', 1).select().first()
        .then(user => expect(user.email).toMatch('chris@email.com'))
    })
})

test('updateUser returns the correct user', () => {
  const updates = {
    email: 'chris@email.com'
  }
  return db.updateUser(updates, 1, testDb)
    .then((user) => {
      expect(user.email).toMatch('chris@email.com')
    })
})
