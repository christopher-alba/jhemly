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

jest.mock('../../db/sizesdb', () => {
  return {
    getSizes: () => {
      return Promise.resolve()
    },

    addSize: () => {
      return Promise.resolve()
    },

    updateSize: () => {
      return Promise.resolve()
    },

    deleteSize: () => {
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

test('Test if getSize route is working', () => {
  return request(server)
    .get('/api/v1/sizes/1')
    .then(res => {
      expect(res.status).toBe(200)
    })
})

test('Test if addSize route is working', () => {
  return request(server)
    .post('/api/v1/sizes/')
    .then(res => {
      expect(res.status).toBe(200)
    })
})

test('Test if updateSize route is working', () => {
  return request(server)
    .put('/api/v1/sizes/1')
    .then(res => {
      expect(res.status).toBe(200)
    })
})

test('Test if deleteSize route is working', () => {
  return request(server)
    .delete('/api/v1/sizes/1')
    .then(res => {
      expect(res.status).toBe(200)
    })
})
