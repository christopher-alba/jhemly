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

jest.mock('../../db/ordersproductsdb', () => {
  return {
    getAll: () => Promise.resolve(),
    getByOrderId: () => Promise.resolve(),
    addOrderItem: () => Promise.resolve(),
    deleteOrderItem: () => Promise.resolve()
  }
})

test('test if getAll route works', () => {
  return request(server)
    .get('/api/v1/ordersproducts')
    .then(res => expect(res.status).toBe(200))
})

test('test if getByOrderId route works', () => {
  return request(server)
    .get('/api/v1/ordersproducts/1')
    .then(res => expect(res.status).toBe(200))
})

test('test if addOrderItem route works', () => {
  return request(server)
    .get('/api/v1/ordersproducts/')
    .then(res => expect(res.status).toBe(200))
})

test('test if deleteOrderItem route works', () => {
  return request(server)
    .delete('/api/v1/ordersproducts/')
    .then(res => expect(res.status).toBe(200))
})
