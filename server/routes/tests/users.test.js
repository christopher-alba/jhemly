const request = require('supertest')
const server = require('../../server')
test('Test if get route is protected', () => {
  return request(server)
    .get('/api/v1/users')
    .then(res => {
      expect(res.status).toBe(401)
    })
})
