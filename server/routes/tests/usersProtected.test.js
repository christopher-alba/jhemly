const request = require('supertest')
const server = require('../../server')

test('Test if getAll route is protected', () => {
  return request(server)
    .get('/api/v1/users')
    .then(res => {
      expect(res.status).toBe(401)
    })
})

test('Test if getUser route is protected', () => {
  return request(server)
    .get('/api/v1/users/1')
    .then(res => {
      expect(res.status).toBe(401)
    })
})

test('Test if addUser route is protected', () => {
  return request(server)
    .post('/api/v1/users/')
    .then(res => {
      expect(res.status).toBe(401)
    })
})

test('Test if updateUser route is protected', () => {
  return request(server)
    .put('/api/v1/users/1')
    .then(res => {
      expect(res.status).toBe(401)
    })
})

test('Test if deleteUser route is protected', () => {
  return request(server)
    .delete('/api/v1/users/1')
    .then(res => {
      expect(res.status).toBe(401)
    })
})
