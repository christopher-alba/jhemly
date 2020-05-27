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
    },
    isLoggedIn: (next) => {
      return next()
    }
  }
})

jest.mock('../../db/userscartdb', () => {
  return {
    getAll: () => Promise.resolve(),
    getUserCart: () => Promise.resolve(),
    addCartItem: () => Promise.resolve(),
    deleteCartItem: () => Promise.resolve(),
    clearUserCart: () => Promise.resolve()
  }
})

test('test if getAll route works', () => {
  request(server)
    .get('/api/v1/userscart')
    .then(res => expect(res.status).toBe(200))
})

test('test if getUserCart route works', () => {
  request(server)
    .get('/api/v1/userscart/1')
    .then(res => expect(res.status).toBe(200))
})

test('test if addCartItem route works', () => {
  request(server)
    .post('/api/v1/userscart')
    .then(res => expect(res.status).toBe(200))
})

test('test if deleteCartItem route works', () => {
  request(server)
    .delete('/api/v1/userscart')
    .then(res => expect(res.status).toBe(200))
})

test('test if clearUserCart route works', () => {
  request(server)
    .delete('/api/v1/userscart/1')
    .then(res => expect(res.status).toBe(200))
})
