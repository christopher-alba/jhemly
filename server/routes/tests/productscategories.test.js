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

jest.mock('../../db/productscategoriesdb', () => {
  return {
    getAll: () => {
      return Promise.resolve()
    },

    getProductCats: () => {
      return Promise.resolve()
    },

    addProductCat: () => {
      return Promise.resolve()
    },
    deleteProductCat: () => {
      return Promise.resolve()
    }
  }
})

test('test getAll route works', () => {
  return request(server)
    .get('/api/v1/productscategories/')
    .then(res => expect(res.status).toBe(200))
})

test('test getProductCats route works', () => {
  return request(server)
    .get('/api/v1/productscategories/1')
    .then(res => expect(res.status).toBe(200))
})

test('test addProductCat route works', () => {
  return request(server)
    .post('/api/v1/productscategories')
    .then(res => expect(res.status).toBe(200))
})

test('test deleteProductCat route works', () => {
  return request(server)
    .delete('/api/v1/productscategories')
    .then(res => expect(res.status).toBe(200))
})
