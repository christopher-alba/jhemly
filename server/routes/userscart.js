const userscartdb = require('../db/userscartdb')
const express = require('express')
const router = express.Router()
const camelcaseKeys = require('camelcase-keys')

module.exports = router

const { isGetOwner, isAdmin, isLoggedIn } = require('../middleware/index')

// GET /api/v1/userscart/
router.get('/', isAdmin, (req, res) => {
  userscartdb.getAll()
    .then(camelcaseKeys)
    .then(items => res.status(200).json(items))
    .catch(err => res.status(500).send(err.message))
})
// GET /api/v1/userscart/:id
router.get('/:id', isGetOwner, (req, res) => {
  userscartdb.getUserCart(req.params.id)
    .then(camelcaseKeys)
    .then(items => res.status(200).json(items))
    .catch(err => res.status(500).send(err.message))
})

// POST /api/v1/userscart/
router.post('/', isLoggedIn(), (req, res) => {
  userscartdb.addCartItem(req.body)
    .then(items => res.status(200).json(items))
    .catch(err => res.status(500).send(err.message))
})
