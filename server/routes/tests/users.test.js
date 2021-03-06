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

jest.mock('../../db/usersdb', () => {
  return {
    getAll: () => {
      return Promise.resolve()
    },

    getUser: () => {
      return Promise.resolve()
    },

    addUser: () => {
      return Promise.resolve()
    },

    updateUser: () => {
      return Promise.resolve()
    },

    deleteUser: () => {
      return Promise.resolve()
    }
  }
})

test('Test if getAll route is working', () => {
  return request(server)
    .get('/api/v1/users')
    .then(res => {
      expect(res.status).toBe(200)
    })
})

test('Test if getUser route is working', () => {
  return request(server)
    .get('/api/v1/users/1')
    .then(res => {
      expect(res.status).toBe(200)
    })
})

test('Test if addUser route is working', () => {
  return request(server)
    .post('/api/v1/users/')
    .then(res => {
      expect(res.status).toBe(200)
    })
})

test('Test if updateUser route is working', () => {
  return request(server)
    .put('/api/v1/users/1')
    .then(res => {
      expect(res.status).toBe(200)
    })
})

test('Test if deleteUser route is working', () => {
  return request(server)
    .delete('/api/v1/users/1')
    .then(res => {
      expect(res.status).toBe(200)
    })
})
