const connection = require('./index')

module.exports = {
  getAll,
  getProfile
}

function getAll (db = connection) {
  return db('profiles').select()
}

function getProfile (id, db = connection) {
  return db('profiles')
    .where('profile_id', id)
    .select()
    .first()
}
