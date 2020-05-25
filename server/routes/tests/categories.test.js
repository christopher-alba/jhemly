const request = require('supertest')
const server = require('../../server')

jest.mock('../../middleware/index', () => {
  return {
    isAdmin: (req, res, next) => {
      return next()
    },
    isGetOwner: (req, res, next) => {
      return next()
    },
    isFromOwner: (req, res, next) => {
      return next()
    }
  }
})

jest.mock('../../db/categoriesdb', () => {
  return {
    getAll: () => {
      return Promise.resolve()
    },
    addCategory: () => {
      return Promise.resolve()
    },
    deleteCategory: () => {
      return Promise.resolve()
    }
  }
})

test('Test if getAll route is working', () => {
  return request(server)
    .get('/api/v1/categories')
    .then(res => {
      expect(res.status).toBe(200)
    })
})

test('Test if addCategory route is working', () => {
  return request(server)
    .post('/api/v1/categories/')
    .then(res => {
      expect(res.status).toBe(200)
    })
})

test('Test if deleteCategory route is working', () => {
  return request(server)
    .delete('/api/v1/categories/1')
    .then(res => {
      expect(res.status).toBe(200)
    })
})
