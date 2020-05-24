const request = require('supertest')

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
    isLoggedIn: (req, res, next) => {
      return next()
    }
  }
})