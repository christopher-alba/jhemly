const productsdb = require('../db/usersdb')
const router = require('express').Router()

module.export = router

// GET /api/v1/products/
router.get('/', (req, res) => {
  productsdb.getAll()
    .then(productsRes => {
      res.json(productsRes.body)
    })
})
// GET /api/v1/products/:id
router.get('/:id', (req, res) => {
  productsdb.getProduct(req.params.id)
    .then(productRes => {
      res.json(productRes.body)
    })
})
