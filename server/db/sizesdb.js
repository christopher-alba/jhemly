const connection = require('./index')

module.exports = {
  getSizes,
  addSize
}

function getSizes (id, db = connection) {
  return db('sizes')
    .where('size_id', id)
    .select()
}

function addSize (item, db = connection) {
  return db('sizes')
    .insert({ ...item })
    .then(() => {
      return db('sizes')
        .select()
    })
}
