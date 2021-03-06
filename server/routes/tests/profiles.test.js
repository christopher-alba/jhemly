const request = require('supertest')
const server = require('../../server')
const knex = require('knex')
const config = require('../../../knexfile').test
const testDb = knex(config)

jest.mock('../../middleware/index', () => {
  return {
    isAdmin: (req, res, next) => {
      return next()
    },
    isGetOwner: (req, res, next) => {
      return next()
    },
    isFromOwner: (location, req, res, next) => {
      return next()
    }
  }
})

jest.mock('../../db/profilesdb', () => {
  return {
    getAll: () => {
      return Promise.resolve()
    },

    getProfile: () => {
      return Promise.resolve()
    },

    addProfile: () => {
      return Promise.resolve()
    },

    updateProfile: () => {
      return Promise.resolve()
    },

    deleteProfile: () => {
      return Promise.resolve()
    }
  }
})

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

test('Test if getAll route is working', () => {
  return request(server)
    .get('/api/v1/profiles')
    .then(res => {
      expect(res.status).toBe(200)
    })
})

test('Test if getProfile route is working', () => {
  return request(server)
    .get('/api/v1/profiles/1')
    .then(res => {
      expect(res.status).toBe(200)
    })
})

test('Test if addProfile route is working', () => {
  return request(server)
    .post('/api/v1/profiles/')
    .then(res => {
      expect(res.status).toBe(200)
    })
})

test('Test if updateProfile route is working', () => {
  return request(server)
    .put('/api/v1/profiles/1')
    .then(res => {
      expect(res.status).toBe(200)
    })
})

test('Test if deleteProfile route is working', () => {
  return request(server)
    .delete('/api/v1/profiles/1')
    .then(res => {
      expect(res.status).toBe(200)
    })
})
