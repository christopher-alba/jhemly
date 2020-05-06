const connection = require('./index')

module.exports = {
  getAll,
  getUser,
  addUser,
  updateUser,
  deleteUser
}

function getAll (db = connection) {
  return db('users').select()
}

function getUser (id, db = connection) {
  return db('users')
    .where('User_id', id)
    .select()
    .first()
}

function addUser (User, db = connection) {
  return db('users')
    .insert({ ...User })
}

function updateUser (updates, id, db = connection) {
  return db('users')
    .where('User_id', id)
    .update({ ...updates })
}

function deleteUser (id, db = connection) {
  return db('users')
    .where('User_id', id)
    .del()
}
