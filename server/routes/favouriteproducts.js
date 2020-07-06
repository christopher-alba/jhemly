const router = require('express').Router()
const db = require('../db/favouriteproductsdb')
const camelcaseKeys = require('camelcase-keys')
const { isLoggedIn } = require('../middleware/index')
module.exports = router
// GET /api/v1/favouriteproducts/:id
router.get('/:id', (req, res) => {
  db.getUserFavourites(req.params.id)
    .then(camelcaseKeys)
    .then(favs => res.status(200).json(favs))
    .catch(err => res.status(500).send(err.message))
})

// POST /api/v1/favouriteproducts/
router.post('/', (req, res, next) => isLoggedIn(next), (req, res) => {
  db.addUserFavourite(req.body)
    .then(() => res.status(200).send())
    .catch(err => res.status(500).send(err.message))
})

// DELETE /api/v1/favouriteproducts/
router.delete('/', (req, res, next) => isLoggedIn(next), (req, res) => {
  db.deleteUserFavourite(req.body)
    .then(() => res.status(200).send())
    .catch(err => res.status(500).send(err.message))
})
