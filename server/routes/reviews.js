const reviewsdb = require('../db/reviewsdb')
const express = require('express')
const camelcaseKeys = require('camelcase-keys')
const router = express.Router()
const { isAdmin } = require('../middleware/index')

module.exports = router

// GET /api/v1/reviews/
router.get('/', (req, res) => {
  reviewsdb.getReviews()
    .then(camelcaseKeys)
    .then(allreviews => {
      res.status(200).json(allreviews)
    })
    .catch(err => res.status(400).send(err.message))
})

// GET /api/v1/reviews/:id
router.get('/:id', (req, res) => {
  reviewsdb.getReviews(req.params.id)
    .then(camelcaseKeys)
    .then(allreviews => {
      res.status(200).json(allreviews)
    })
    .catch(err => res.status(400).send(err.message))
})

// POST /api/v1/reviews/:id
router.post('/', isAdmin, (req, res) => {
  reviewsdb.addReview(req.body)
    .then(camelcaseKeys)
    .then(allreviews => {
      res.status(200).json(allreviews)
    })
    .catch(err => res.status(400).send(err.message))
})

// PUT /api/v1/reviews/:id
router.put('/:id', isAdmin, (req, res) => {
  reviewsdb.updateReview(req.body, req.params.id)
    .then(camelcaseKeys)
    .then(updated => {
      res.status(200).json(updated)
    })
    .catch(err => res.status(400).send(err.message))
})

// DELETE /api/v1/reviews/:id
router.delete('/:id', isAdmin, (req, res) => {
  reviewsdb.deleteReview(req.params.id)
    .then(id => res.status(200).send(id))
    .catch(err => res.status(400).send(err.message))
})