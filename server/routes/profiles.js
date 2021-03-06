const profilesdb = require('../db/profilesdb')
const express = require('express')
const camelcaseKeys = require('camelcase-keys')
const snakecaseKeys = require('snakecase-keys')
const router = express.Router()
const { isAdmin, isFromOwner } = require('../middleware/index')
module.exports = router

// GET /api/v1/profiles/
router.get('/', (req, res) => {
  profilesdb.getAll()
    .then(camelcaseKeys)
    .then(profiles => res.status(200).json(profiles))
    .catch(err => res.status(500).send(err.message))
})

// GET /api/v1/profiles/:id
router.get('/:id', (req, res) => {
  profilesdb.getProfile(req.params.id)
    .then(camelcaseKeys)
    .then(profile => res.status(200).json(profile))
    .catch(err => res.status(500).send(err.message))
})

// POST /api/v1/profiles/
router.post('/', isAdmin, (req, res) => {
  profilesdb.addProfile(snakecaseKeys({ ...req.body }))
    .then(camelcaseKeys)
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).send(err.message))
})

// PUT /api/v1/profiles/:id
router.put('/:id', (req, res, next) => isFromOwner('profile', req, res, next), (req, res) => {
  profilesdb.updateProfile(snakecaseKeys({ ...req.body }), req.params.id)
    .then(camelcaseKeys)
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).send(err.message))
})

// DELETE /api/v1/profiles/:id
router.delete('/:id', (req, res, next) => isFromOwner('profile', req, res, next), (req, res) => {
  profilesdb.deleteProfile(req.params.id)
    .then(response => res.status(200).send(response))
    .catch(err => res.status(500).send(err.message))
})
