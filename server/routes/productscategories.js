const db = require('../db/productscategoriesdb')
const express = require('express')
const camelcaseKeys = require('camelcase-keys')
const snakecaseKeys = require('snakecase-keys')
const { isAdmin } = require('../middleware/index')
const router = express.Router()
module.exports = router

// GET /api/v1/productscategories
router.get('/', (req, res) => {
  db.getAll()
    .then(camelcaseKeys)
    .then(items => res.status(200).json(items))
    .catch(err => res.status(500).send(err.message))
})

// GET /api/v1/productscategories/:id
router.get('/:id', (req, res) => {
  db.getProductCats(req.params.id)
    .then(camelcaseKeys)
    .then(items => res.status(200).json(items))
    .catch(err => res.status(500).send(err.message))
})

// POST /api/v1/productscategories
router.post('/', isAdmin, (req, res) => {
  db.addProductCat(snakecaseKeys({ ...req.body }))
    .then(camelcaseKeys)
    .then(items => res.status(200).json(items))
    .catch(err => res.status(500).send(err.message))
})

// DELETE /api/v1/productscategories
router.delete('/', isAdmin, (req, res) => {
  db.deleteProductCat(req.body.productId, req.body.categoryId)
    .then(camelcaseKeys)
    .then(id => res.status(200).json(id))
    .catch(err => res.status(500).send(err.message))
})
