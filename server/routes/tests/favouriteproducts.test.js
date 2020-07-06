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

jest.mock('../../db/favouriteproductsdb', () => {
  return {
    getUserFavourites: () => Promise.resolve(),
    addUserFavourite: () => Promise.resolve(),
    deleteUserFavourite: () => Promise.resolve()
  }
})

test('test getUserFavourite route works', () => {
  return request(server)
    .get('/api/v1/favouriteproducts/1')
    .then(res => expect(res.status).toBe(200))
})

test('test if addUserFavourite route works', () => {
  return request(server)
    .post('/api/v1/favouriteproducts/')
    .then(res => expect(res.status).toBe(200))
})

test('test deleteUserFavourite route works', () => {
  return request(server)
    .delete('/api/v1/favouriteproducts')
    .then(res => expect(res.status).toBe(200))
})
