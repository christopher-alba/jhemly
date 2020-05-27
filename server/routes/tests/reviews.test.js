const request = require('supertest')
const server = require('../../server')
jest.mock('../../db/reviewsdb', () => {
  return {
    getAll: () => Promise.resolve(),
    getReviews: () => Promise.resolve(),
    addReview: () => Promise.resolve(),
    updateReview: () => Promise.resolve(),
    deleteReview: () => Promise.resolve()
  }
})

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
    },
    isLoggedIn: (next) => {
      return next()
    }
  }
})

test('test if getAll route works', () => {
  request(server)
    .get('/api/v1/reviews')
    .then(res => expect(res.status).toBe(200))
})

test('test if getReviews route works', () => {
  request(server)
    .get('/api/v1/reviews/1')
    .then(res => expect(res.status).toBe(200))
})

test('test if addReview route works', () => {
  request(server)
    .post('/api/v1/reviews/')
    .then(res => expect(res.status).toBe(200))
})

test('test if updateReview route works', () => {
  request(server)
    .put('/api/v1/reviews/1')
    .then(res => expect(res.status).toBe(200))
})

test('test if deleteReview route works', () => {
  request(server)
    .delete('/api/v1/reviews/1')
    .then(res => expect(res.status).toBe(200))
})
