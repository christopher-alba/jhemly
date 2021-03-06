const reviewsdb = require('../db/reviewsdb')
const express = require('express')
const camelcaseKeys = require('camelcase-keys')
const snakecaseKeys = require('snakecase-keys')
const router = express.Router()
const { isGetOwner, isLoggedIn, isFromOwner } = require('../middleware/index')

module.exports = router

// GET /api/v1/reviews/
router.get('/', (req, res) => {
  reviewsdb.getAll()
    .then(camelcaseKeys)
    .then(allreviews => {
      res.status(200).json(allreviews)
    })
    .catch(err => res.status(400).send(err.message))
})

// GET /api/v1/reviews/:id
router.get('/:id', isGetOwner, (req, res) => {
  reviewsdb.getReviews(req.params.id)
    .then(camelcaseKeys)
    .then(allreviews => {
      res.status(200).json(allreviews)
    })
    .catch(err => res.status(400).send(err.message))
})

// POST /api/v1/reviews/:id
router.post('/', (req, res, next) => isLoggedIn(next), (req, res) => {
  reviewsdb.addReview(snakecaseKeys({ ...req.body }))
    .then(camelcaseKeys)
    .then(allreviews => {
      res.status(200).json(allreviews)
    })
    .catch(err => res.status(400).send(err.message))
})

// PUT /api/v1/reviews/:id
router.put('/:id', (req, res, next) => isFromOwner('review', req, res, next), (req, res) => {
  reviewsdb.updateReview(snakecaseKeys({ ...req.body }), req.params.id)
    .then(camelcaseKeys)
    .then(updated => {
      res.status(200).json(updated)
    })
    .catch(err => res.status(400).send(err.message))
})

// DELETE /api/v1/reviews/:id
router.delete('/:id', (req, res, next) => isFromOwner('review', req, res, next), (req, res) => {
  reviewsdb.deleteReview(req.params.id)
    .then(id => res.status(200).send(id))
    .catch(err => res.status(400).send(err.message))
})
