const request = require('supertest')
const server = require('../../server')

test('Test if addProfile route is protected', () => {
  return request(server)
    .post('/api/v1/profiles/')
    .then(res => {
      expect(res.status).toBe(401)
    })
})

test('Test if updateProfile route is protected', () => {
  return request(server)
    .put('/api/v1/profiles/1')
    .then(res => {
      expect(res.status).toBe(401)
    })
})

test('Test if deleteProfile route is protected', () => {
  return request(server)
    .delete('/api/v1/profiles/1')
    .then(res => {
      expect(res.status).toBe(401)
    })
})
