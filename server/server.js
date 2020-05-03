const path = require('path')
const express = require('express')

const server = express()
const products = require('./routes/products')
server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))
server.use(express.urlencoded({ extended: true }))

server.use('/api/v1/products', products)

module.exports = server
