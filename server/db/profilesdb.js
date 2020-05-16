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
    .catch(err => errorHandler(err, 'getAll'))
}

function getProfile (id, db = connection) {
  return db('profiles')
    .where('profile_id', id)
    .select()
    .first()
    .catch(err => errorHandler(err, 'getProfile'))
}

function addProfile (profile, db = connection) {
  return db('profiles')
    .insert({ ...profile })
    .then(() => {
      return db('profiles').select()
    })
    .catch(err => errorHandler(err, 'addProfile'))
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
    .catch(err => errorHandler(err, 'updateProfile'))
}

function deleteProfile (id, db = connection) {
  return db('profiles')
    .where('profile_id', id)
    .del()
    .then(() => id)
    .catch(err => errorHandler(err, 'deleteProfile'))
}

function errorHandler (err, location) {
  return `There is an error in ${location}. \n ${err.message}`
}
