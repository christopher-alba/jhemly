const connection = require('./index')

module.exports = {
  getSizes
}

function getSizes (id, db = connection) {
  return db('sizes')
    .where('size_id', id)
    .select()
}

