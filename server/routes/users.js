const usersdb = require('../db/usersdb')
const express = require('express')
const router = express.Router()
module.exports = router

// GET /api/v1/users/
router.get('/', (req, res) => {
  usersdb.getAll()
    .then(usersRes => {
      res.json(usersRes)
    })
    .catch(err => res.send(err.message))
})
// GET /api/v1/users/:id
router.get('/:id', (req, res) => {
  usersdb.getUser(req.params.id)
    .then(response => {
      res.json(response)
    })
    .catch(err => res.send(err.message))
})
// POST /api/v1/users/
router.post('/', (req, res) => {
  usersdb.addUser(req.body)
    .then(response => res.status(201).send())
    .catch(err => res.send(err.message))
})

// PUT /api/v1/users/:id
router.put('/:id', (req, res) => {
  usersdb.updateUser(req.body, req.params.id)
    .then(response => res.status(201).send())
    .catch(err => res.send(err.message))
})

// DELETE /api/v1/users/:id
router.delete('/:id', (req, res) => {
  usersdb.deleteUser(req.params.id)
    .then(response => res.status(201).send())
    .catch(err => res.send(err.message))
})
