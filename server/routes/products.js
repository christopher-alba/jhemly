const productsdb = require('../db/productsdb')
const express = require('express')
const camelcaseKeys = require('camelcase-keys')
const { isAdmin } = require('../middleware/index')
const router = express.Router()
module.exports = router

// GET /api/v1/products/
router.get('/', isAdmin, (req, res) => {
  productsdb.getAll()
    .then(camelcaseKeys)
    .then(productsRes => {
      res.status(200).json(productsRes)
    })
    .catch(err => res.send(err.message))
})
// GET /api/v1/products/:id
router.get('/:id', isAdmin, (req, res) => {
  productsdb.getProduct(req.params.id)
    .then(camelcaseKeys)
    .then(productRes => {
      res.status(200).json(productRes)
    })
    .catch(err => res.send(err.message))
})
// POST /api/v1/products/
router.post('/', isAdmin, (req, res) => {
  productsdb.addProduct(req.body)
    .then(camelcaseKeys)
    .then(response => res.status(200).send(response))
    .catch(err => res.send(err.message))
})

// PUT /api/v1/products/:id
router.put('/:id', isAdmin, (req, res) => {
  productsdb.updateProduct(req.body, req.params.id)
    .then(camelcaseKeys)
    .then(response => res.status(200).send(response))
    .catch(err => res.send(err.message))
})

// DELETE /api/v1/products/:id
router.delete('/:id', isAdmin, (req, res) => {
  productsdb.deleteProduct(req.params.id)
    .then(response => res.status(200).send(response))
    .catch(err => res.send(err.message))
})
