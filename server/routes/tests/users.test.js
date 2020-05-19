const request = require('supertest')
const server = require('../../server')

jest.mock('../../middleware/index', () => {
  return {
    isAdmin: (req, res, next) => {
      return next()
    },
    isGetOwner: (req, res, next) => {
      return next()
    }
  }
})

test('Test if getAll route is working (as admin)', () => {

  return request(server)
    .get('/api/v1/users')
    .then(res => {
      expect(res.status).toBe(200)
    })
})
