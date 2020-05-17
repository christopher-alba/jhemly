const path = require('path')
const express = require('express')
const cors = require('cors')
const server = express()
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

server.use(cors())
server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))
server.use(express.urlencoded({ extended: true }))

const products = require('./routes/products')
const users = require('./routes/users')
const profiles = require('./routes/profiles')
const auth = require('./routes/auth')

server.use('/api/v1/products', products)
server.use('/api/v1/users', users)
server.use('/api/v1/profiles', profiles)
server.use('/api/v1/auth', auth)
module.exports = server
