const connection = require('./index')

module.exports = {
  getAll,
  getReviews,
  addReview,
  updateReview,
  deleteReview
}

function getAll (db = connection) {
  return db('reviews').select()
    .catch(err => errorHandler('getAll', err))
}

function getReviews (id, db = connection) {
  return db('reviews')
    .where('user_id', id)
    .select()
    .catch(err => errorHandler('getReviews', err))
}

function addReview (review, db = connection) {
  return db('reviews')
    .insert({ ...review })
    .then(() => db('reviews').select())
    .catch(err => errorHandler('addReviews', err))
}

function updateReview (updates, id, db = connection) {
  return db('reviews')
    .where('review_id', id)
    .update({ ...updates })
    .then(() => db('reviews').where('review_id', id).select().first())
    .catch(err => errorHandler('updateReviews', err))
}

function deleteReview (id, db = connection) {
  return db('reviews')
    .where('review_id', id)
    .del()
    .then(() => id)
    .catch(err => errorHandler('deleteReviews', err))
}

function errorHandler (location, error) {
  // eslint-disable-next-line no-console
  console.log(`Error in ${location} inside reviewsdb.js \n ${error.message}`)
}
