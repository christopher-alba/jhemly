/* eslint-disable no-console */
const connection = require('./index')

module.exports = {
  getAll,
  getUser,
  addUser,
  updateUser,
  deleteUser
}

function getAll (db = connection) {
  return db('users')
    .select()
    .catch(err => errorHandler(err, 'getAll'))
}

function getUser (id, db = connection) {
  return db('users')
    .where('User_id', id)
    .select()
    .first()
    .catch(err => errorHandler(err, 'getUser'))
}

function addUser (User, db = connection) {
  return db('users')
    .insert({ ...User })
    .catch(err => errorHandler(err, 'addUser'))
}

function updateUser (updates, id, db = connection) {
  return db('users')
    .where('User_id', id)
    .update({ ...updates })
    .catch(err => errorHandler(err, 'updateUser'))
}

function deleteUser (id, db = connection) {
  return db('users')
    .where('User_id', id)
    .del()
    .catch(err => errorHandler(err, 'deleteUser'))
}
function errorHandler (err, location) {
  console.log(`You have an error in ${location} function inside usersdb. \n ${err.message}`)
}
