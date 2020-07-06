const sizesdb = require('../db/sizesdb')
const express = require('express')
const camelcaseKeys = require('camelcase-keys')
const snakecaseKeys = require('snakecase-keys')
const router = express.Router()
const { isAdmin } = require('../middleware/index')

module.exports = router

// GET /api/v1/sizes/:id
router.get('/:id', (req, res) => {
  sizesdb.getSizes(req.params.id)
    .then(camelcaseKeys)
    .then(allSizes => {
      res.status(200).json(allSizes)
    })
    .catch(err => res.status(400).send(err.message))
})

// POST /api/v1/sizes/:id
router.post('/', isAdmin, (req, res) => {
  sizesdb.addSize(snakecaseKeys({ ...req.body }))
    .then(camelcaseKeys)
    .then(allSizes => {
      res.status(200).json(allSizes)
    })
    .catch(err => res.status(400).send(err.message))
})

// PUT /api/v1/sizes/:id
router.put('/:id', isAdmin, (req, res) => {
  sizesdb.updateSize(snakecaseKeys({ ...req.body }), req.params.id)
    .then(camelcaseKeys)
    .then(updated => {
      res.status(200).json(updated)
    })
    .catch(err => res.status(400).send(err.message))
})

// DELETE /api/v1/sizes/:id
router.delete('/:id', isAdmin, (req, res) => {
  sizesdb.deleteSize(req.params.id)
    .then(id => res.status(200).send(id))
    .catch(err => res.status(400).send(err.message))
})
