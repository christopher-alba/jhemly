const passport = require('passport')
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const db = require('../db/index')

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
}

passport.use(
  'jwt',
  new JWTstrategy(opts, async (jwtPayload, done) => {
    try {
      const user = await db('users').where('user_id', jwtPayload.user_id).select()
      if (user) {
        done(null, jwtPayload)
      } else {
        done(null, false)
      }
    } catch (err) {
      done(err)
    }
  })
)

module.exports = passport
