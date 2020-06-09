const environment = process.env.NODE_ENV || 'development'
// eslint-disable-next-line no-console
console.log(environment)

const config = require('../../knexfile')[environment]
const connection = require('knex')(config)

module.exports = connection
