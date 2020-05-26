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

