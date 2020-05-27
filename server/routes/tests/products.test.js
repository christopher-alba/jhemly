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

jest.mock('../../db/productsdb', () => {
  return {
    getAll: () => {
      return Promise.resolve()
    },

    getProduct: () => {
      return Promise.resolve()
    },

    addProduct: () => {
      return Promise.resolve()
    },

    updateProduct: () => {
      return Promise.resolve()
    },

    deleteProduct: () => {
      return Promise.resolve()
    }
  }
})

test('Test if getAll route is working', () => {
  return request(server)
    .get('/api/v1/products')
    .then(res => {
      expect(res.status).toBe(200)
    })
})

test('Test if getProduct route is working', () => {
  return request(server)
    .get('/api/v1/products/1')
    .then(res => {
      expect(res.status).toBe(200)
    })
})

test('Test if addProduct route is working', () => {
  return request(server)
    .post('/api/v1/products/')
    .then(res => {
      expect(res.status).toBe(200)
    })
})

test('Test if updateProduct route is working', () => {
  return request(server)
    .put('/api/v1/products/1')
    .then(res => {
      expect(res.status).toBe(200)
    })
})

test('Test if deleteProduct route is working', () => {
  return request(server)
    .delete('/api/v1/products/1')
    .then(res => {
      expect(res.status).toBe(200)
    })
})
