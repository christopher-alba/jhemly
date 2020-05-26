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

jest.mock('../../db/ordersdb', () => {
  return {
    getAll: () => Promise.resolve(),
    getOrder: () => Promise.resolve(),
    getOrders: () => Promise.resolve(),
    addOrder: () => Promise.resolve(),
    deleteOrder: () => Promise.resolve()
  }
})

test('test if getAll route works', () => {
  return request(server)
    .get('/api/v1/orders')
    .then(res => expect(res.status).toBe(200))
})

test('test if getOrder route works', () => {
  return request(server)
    .get('/api/v1/orders/1')
    .then(res => expect(res.status).toBe(200))
})

test('test if getOrders route works', () => {
  return request(server)
    .get('/api/v1/orders/user/1')
    .then(res => expect(res.status).toBe(200))
})

test('test if addOrder route works', () => {
  return request(server)
    .post('/api/v1/orders/')
    .then(res => expect(res.status).toBe(200))
})

test('test if deleteOrder route works', () => {
  return request(server)
    .delete('/api/v1/orders/1')
    .then(res => expect(res.status).toBe(200))
})
