const router = require('express').Router()
const db = require('../db/ordersdb')
const camelcaseKeys = require('camelcase-keys')
const snakecaseKeys = require('snakecase-keys')
const { isAdmin, isGetOwner } = require('../middleware/index')
module.exports = router

// GET /api/v1/orders
router.get('/', isAdmin, (req, res) => {
  db.getAll()
    .then(camelcaseKeys)
    .then(orders => res.status(200).json(orders))
    .catch(err => res.status(500).send(err.message))
})

// GET /api/v1/orders/:id
router.get('/:id', isAdmin, (req, res) => {
  db.getOrder(req.params.id)
    .then(camelcaseKeys)
    .then(order => res.status(200).json(order))
    .catch(err => res.status(500).send(err.message))
})

// GET /api/v1/orders/user/:id
router.get('/user/:id', isGetOwner, (req, res) => {
  db.getOrders(req.params.id)
    .then(camelcaseKeys)
    .then(orders => res.status(200).json(orders))
    .catch(err => res.status(500).send(err.message))
})

// POST /api/v1/orders/
router.post('/', (req, res) => {
  db.addOrder(snakecaseKeys({ ...req.body }))
    .then(camelcaseKeys)
    .then(orders => res.status(200).json(orders))
    .catch(err => res.status(500).send(err.message))
})

// DELETE /api/v1/orders/:id
router.delete('/:id', isAdmin, (req, res) => {
  db.deleteOrder(req.params.id)
    .then(id => res.status(200).send(id))
    .catch(err => res.status(500).send(err.message))
})
