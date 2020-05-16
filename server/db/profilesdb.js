const connection = require('./index')

module.exports = {
  getAll,
  getProfile,
  addProfile,
  updateProfile,
  deleteProfile
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

function addProfile (profile, db = connection) {
  return db('profiles')
    .insert({ ...profile })
    .then(() => {
      return db('profiles').select()
    })
}

function updateProfile (updates, id, db = connection) {
  return db('profiles')
    .where('profile_id', id)
    .update({ ...updates })
    .then(() => {
      return db('profiles')
        .where('profile_id', id)
        .select()
        .first()
    })
}

function deleteProfile (id, db = connection) {
  return db('profiles')
    .where('profile_id', id)
    .del()
    .then(() => id)
}
