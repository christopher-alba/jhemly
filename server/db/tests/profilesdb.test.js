/* eslint-disable camelcase */
const knex = require('knex')
const config = require('../../../knexfile').test
const testDb = knex(config)

const db = require('../profilesdb')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

test('getAll returns all profiles', () => {
  return db.getAll(testDb)
    .then(profiles => expect(profiles).toHaveLength(6))
})

test('getProfile gets correct profile', () => {
  return db.getProfile(1, testDb)
    .then(profile => expect(profile.user_id).toBe(1))
})

test('addProfile adds a new profile', () => {
  const profile = {
    user_id: 7,
    user_name: 'Seven',
    profile_image: 'random image 7',
    mailing_address: 'street7'
  }
  return db.addProfile(profile, testDb)
    .then(() => {
      return testDb('profiles').select()
    })
    .then(profiles => {
      expect(profiles).toHaveLength(7)
    })
})

test('updateProfile updates the profile', () => {
  const updates = {
    user_name: 'moooo'
  }
  return db.updateProfile(updates, 1, testDb)
    .then(() => {
      return db.getProfile(1, testDb)
    })
    .then(product => {
      expect(product.user_name).toMatch('moooo')
    })
})
