const usersdb = require('../db/usersdb')
const express = require('express')
const router = express.Router()
const camelcaseKeys = require('camelcase-keys')
const snakecaseKeys = require('snakecase-keys')
module.exports = router
const { isGetOwner, isAdmin } = require('../middleware/index')
// GET /api/v1/users/
router.get('/', isAdmin, (req, res) => {
  usersdb.getAll()
    .then(camelcaseKeys)
    .then(usersRes => {
      res.json(usersRes)
    })
    .catch(err => res.send(err.message))
})
// GET /api/v1/users/:id
router.get('/:id', isGetOwner, (req, res) => {
  usersdb.getUser(req.params.id)
    .then(camelcaseKeys)
    .then(response => {
      res.json(response)
    })
    .catch(err => res.send(err.message))
})
// POST /api/v1/users/admin
router.post('/', isAdmin, (req, res) => {
  usersdb.addUser(snakecaseKeys({ ...req.body }))
    .then(camelcaseKeys)
    .then(response => res.status(200).send())
    .catch(err => res.send(err.message))
})

// PUT /api/v1/users/:id
router.put('/:id', isGetOwner, (req, res) => {
  usersdb.updateUser(snakecaseKeys({ ...req.body }), req.params.id)
    .then(camelcaseKeys)
    .then(response => res.status(200).send())
    .catch(err => res.send(err.message))
})

// DELETE /api/v1/users/:id
router.delete('/:id', isGetOwner, (req, res) => {
  usersdb.deleteUser(req.params.id)
    .then(camelcaseKeys)
    .then(response => res.status(200).send())
    .catch(err => res.send(err.message))
})
