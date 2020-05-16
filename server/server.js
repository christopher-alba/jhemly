const path = require('path')
const express = require('express')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))
server.use(express.urlencoded({ extended: true }))

const products = require('./routes/products')
const users = require('./routes/users')
const profiles = require('./routes/profiles')

server.use('/api/v1/products', products)
server.use('/api/v1/users', users)
server.use('/api/v1/profiles', profiles)

module.exports = server
