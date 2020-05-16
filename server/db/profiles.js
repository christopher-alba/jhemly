const connection = require('./index')

module.exports = {
  getAll
}

function getAll (db = connection) {
  return db('profiles').select()
}
