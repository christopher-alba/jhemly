const passport = require('../config/passport')
const db = require('../db/index')

const isLoggedIn = (next) => passport.authenticate('jwt', { session: false })
const isGetOwner = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (user.user_id !== Number(req.params.id)) {
      return res.status(401).json('Unauthorize Access')
    }
    next()
  })(req, res, next)
}
const isAdmin = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user.admin) {
      return res.status(401).json('Unauthorize Access')
    }
    next()
  })(req, res, next)
}

const isFromOwner = (route, req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (err) {
      return next(err)
    }
    const data = await db(route + 's').where(`${route}_id`, req.params.id).select('user_id').first()

    if (user.user_id !== data.user_id) {
      return res.status(401).json('Unauthorize Access')
    }
    next()
  })(req, res, next)
}

module.exports = {
  isLoggedIn, isGetOwner, isAdmin, isFromOwner
}
