const sizesdb = require('../db/sizesdb')
const express = require('express')
const camelcaseKeys = require('camelcase-keys')
const router = express.Router()
const { isAdmin } = require('../middleware/index')

module.exports = router

// GET /api/v1/sizes/:id
router.get('/:id', (req, res) => {
  sizesdb.getSizes(req.params.id)
    .then(camelcaseKeys)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => res.status(400).send(err.message))
})

// POST /api/v1/sizes/:id
router.post('/', (req, res) => {
  sizesdb.addSize(req.body)
    .then(camelcaseKeys)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => res.status(400).send(err.message))
})
