const request = require('supertest')
const server = require('../../server')

jest.mock('../../db/auth', () => {
  return {
    authenticate: () => {
      return {
        name: 'chris',
        admin: true
      }
    },
    newUser: () => {
      return {
        user_id: 1,
        email: 'randomemail1@email.com',
        user_name: 'name'
      }
    }
  }
})

test('test if authenticate route works', () => {
  return request(server)
    .post('/api/v1/auth/login')
    .then(res => expect(res.status).toBe(200))
})

test('test if new user route works', () => {
  return request(server)
    .post('/api/v1/auth/register')
    .then(res => expect(res.status).toBe(200))
})
