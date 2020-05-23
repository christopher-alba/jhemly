const connection = require('./index')

module.exports = {
  getSizes,
  addSize,
  updateSize
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

function updateSize (updates, id, db = connection) {
  return db('sizes')
    .where('size_id', id)
    .update({ ...updates })
    .then(() => {
      return db('sizes')
        .where('size_id', id)
        .select()
        .first()
    })
}
