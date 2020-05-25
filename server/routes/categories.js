const router = require('express').Router()
const db = require('../db/categoriesdb')
const camelcaseKeys = require('camelcase-keys')
module.exports = router

// GET /api/v1/categories/
router.get('/', (req, res) => {
  db.getAll()
    .then(camelcaseKeys)
    .then(cats => {
      res.status(200).json(cats)
    })
})
// POST /api/v1/categories/
router.post('/', (req, res) => {
  db.addCategory(req.body)
    .then(camelcaseKeys)
    .then(cats => {
      res.status(200).json(cats)
    })
})
// DELETE /api/v1/categories/
router.delete('/:id', (req, res) => {
  db.deleteCategory(req.params.id)
    .then(id => res.status(200).send(id))
})
