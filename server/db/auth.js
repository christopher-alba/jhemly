const connection = require('./index')
const bcrypt = require('bcrypt')
const fn = require('./profilesdb')
const userfn = require('./usersdb')
const authenticate = async (data, db = connection) => {
  try {
    const user = await db('users').where('email', data.email).first()
    if (typeof user === 'undefined') return 'Email does not exist'

    const isMatch = await bcrypt.compare(data.password, user.password)
    if (!isMatch) return 'Password does not match'

    const userDetails = await fn.getProfile(user.user_id)
    const { admin } = await userfn.getUser(user.user_id)
    return { ...userDetails, admin }
  } catch (err) {
    return 'Authentication - Something went wrong'
  }
}

const newUser = async (data, db = connection) => {
  const { password, confirmPassword, email, userName } = data
  try {
    if (password !== confirmPassword) return 'Password does not match'
    const hashPassword = await bcrypt.hash(password, 10)
    const [ id ] = await db('users').insert({
      email,
      password: hashPassword,
      admin: false
    })
    await db('profiles').insert({
      user_id: id,
      user_name: userName
    })
    return { user_id: id, email, user_name: userName }
  } catch (err) {
    return 'Email is already taken'
  }
}

module.exports = {
  authenticate,
  newUser
}
