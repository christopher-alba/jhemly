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

jest.mock('../profilesdb', () => {
  return {
    getProfile: () => ({ name: 'hello' })

  }
})

jest.mock('../usersdb', () => {
  return {
    getUser: () => ({ admin: true })
  }
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

test('test that authentication works if email and password are right', () => {
  const data = {
    password: '123456',
    email: 'randomemail1@email.com'
  }
  return db.authenticate(data, testDb)
    .then(response => {
      expect(typeof response).toBe('object')
      expect(response.admin).toBeTruthy()
    })
})

test('test that a new user is added', () => {
  const data = {
    password: '123456',
    confirmPassword: '123456',
    email: 'randomemail@email.com',
    userName: 'randomUser'
  }
  return db.newUser(data, testDb)
    .then(() => {
      return testDb('profiles').select()
    })
    .then(profiles => {
      expect(profiles.length)
    })
})

test('test that non matching passwords return correct error', () => {
  const data = {
    password: '123456',
    confirmPassword: '1234567',
    email: 'randomemail@email.com',
    userName: 'randomUser'
  }
  return db.newUser(data, testDb)
    .then(res => {
      expect(res).toMatch('Password does not match')
    })
})

test('test that taken email return correct error', () => {
  const data = {
    password: '123456',
    confirmPassword: '123456',
    email: 'randomemail1@email.com',
    userName: 'randomUser'
  }
  return db.newUser(data, testDb)
    .then(res => {
      expect(res).toMatch('Email is already taken')
    })
})
