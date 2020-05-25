const path = require('path')
const express = require('express')
const cors = require('cors')
const server = express()
require('dotenv').config()

server.use(cors())
server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))
server.use(express.urlencoded({ extended: true }))

const products = require('./routes/products')
const users = require('./routes/users')
const profiles = require('./routes/profiles')
const auth = require('./routes/auth')
const sizes = require('./routes/sizes')
const reviews = require('./routes/reviews')
const categories = require('./routes/categories')

server.use('/api/v1/products', products)
server.use('/api/v1/users', users)
server.use('/api/v1/profiles', profiles)
server.use('/api/v1/auth', auth)
server.use('/api/v1/sizes', sizes)
server.use('/api/v1/reviews', reviews)
server.use('/api/v1/categories', categories)

module.exports = server
