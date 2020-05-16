const connection = require('./index')

module.exports = {
  getAll
}

function getAll (db = connection) {
  return db('profiles').select()
}

function getProfile (id, db = connection) {
  return db('profiles')
    .where('profile_id')
}