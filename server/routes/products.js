const productsdb = require('../db/productsdb')
const express = require('express')
const router = express.Router()
module.exports = router

// GET /api/v1/products/
router.get('/', (req, res) => {
  productsdb.getAll()
    .then(productsRes => {
      res.json(productsRes)
    })
})
// GET /api/v1/products/:id
router.get('/:id', (req, res) => {
  productsdb.getProduct(req.params.id)
    .then(productRes => {
      res.json(productRes)
    })
})
