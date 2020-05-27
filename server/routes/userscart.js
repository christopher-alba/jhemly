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
router.post('/', (req, res, next) => isLoggedIn(next), (req, res) => {
  userscartdb.addCartItem(req.body)
    .then(camelcaseKeys)
    .then(items => res.status(200).json(items))
    .catch(err => res.status(500).send(err.message))
})

// DELETE /api/v1/userscart/
router.delete('/', (req, res, next) => isLoggedIn(next), (req, res) => {
  userscartdb.deleteCartItem(req.body.userId, req.body.productId)
    .then(() => res.status(200).send())
    .catch(err => res.status(500).send(err.message))
})

// DELETE /api/v1/userscart/:id
router.delete('/:id', isGetOwner, (req, res) => {
  userscartdb.clearUserCart(req.params.id)
    .then(() => res.status(200).send())
    .catch(err => res.status(500).send(err.message))
})
