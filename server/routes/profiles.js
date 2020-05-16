const profilesdb = require('../db/profilesdb')
const express = require('express')
const router = express.Router()
module.exports = router

router.get('/', (req, res) => {
  profilesdb.getAll()
    .then(profiles => res.json(profiles))
})
