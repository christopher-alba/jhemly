const profilesdb = require('../db/profilesdb')
const express = require('express')
const router = express.Router()
module.exports = router

// GET /api/v1/profiles/
router.get('/', (req, res) => {
  profilesdb.getAll()
    .then(profiles => res.json(profiles))
})

// GET /api/v1/profiles/:id
router.get('/:id', (req, res) => {
  profilesdb.getProfile(req.params.id)
    .then(profile => res.json(profile))
})

// POST /api/v1/profiles/
router.post('/', (req, res) => {
  profilesdb.addProfile(req.body)
    .then(res => res.status(200).send())
})

// PUT /api/v1/profiles/:id
router.put('/:id', (req, res) => {
  profilesdb.updateProfile(req.body, req.params.id)
    .then(res => res.status(200).send())
})

// DELETE /api/v1/profiles/:id
router.delete('/:id', (req, res) => {
  profilesdb.deleteProfile(req.params.id)
    .then(res => res.status(200).send())
})
