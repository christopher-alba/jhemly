const request = require('supertest')
const server = require('../../server')

test('Test if getAll route is protected (as non-admin)', () => {
  return request(server)
    .get('/api/v1/users')
    .then(res => {
      expect(res.status).toBe(401)
    })
})
