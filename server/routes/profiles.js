const profilesdb = require('../db/profilesdb')
const express = require('express')
const router = express.Router()
module.exports = router

// GET /api/v1/profiles/
router.get('/', (req, res) => {
  profilesdb.getAll()
    .then(profiles => res.json(profiles))
})

// GET /api/v1/profiles/:profile_id
router.get('/:profile_id', (req, res) => {
  profilesdb.getProfile(req.params.profile_id)
    .then(profile => res.json(profile))
})

// POST /api/v1/profiles/
router.post('/', (req, res) => {
  profilesdb.addProfile(req.body)
    .then((res) => res.status(200).send())
})
