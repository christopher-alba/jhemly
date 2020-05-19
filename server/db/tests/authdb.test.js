const knex = require('knex')
const config = require('../../../knexfile').test
const testDb = knex(config)
const db = require('../auth')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})
test('test that authenticate checks that email does not exist', () => {
  const data = {
    password: '123456',
    email: 'nonexistentemail@email.com'
  }
  return db.authenticate(data, testDb)
    .then(response => {
      expect(response).toMatch('Email does not exist')
    })
})

test('test that authenticate checks that password is wrong', () => {
  const data = {
    password: '1234567',
    email: 'randomemail1@email.com'
  }
  return db.authenticate(data, testDb)
    .then(response => {
      expect(response).toMatch('Password does not match')
    })
})
