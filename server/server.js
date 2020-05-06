const path = require('path')
const express = require('express')

const server = express()
const products = require('./routes/products')
const users = require('./routes/users')
server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))
server.use(express.urlencoded({ extended: true }))

server.use('/api/v1/products', products)
server.use('/api/v1/users', users)

module.exports = server
