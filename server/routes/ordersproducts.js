const router = require('express').Router()
const camelcaseKeys = require('camelcase-keys')
const db = require('../db/ordersproductsdb')

module.exports = router

// GET /api/v1/ordersproducts
router.get('/', (req, res) => {
  db.getAll()
    .then(camelcaseKeys)
    .then(items => res.status(200).json(items))
    .catch(err => res.status(500).send(err.message))
})

// GET /api/v1/ordersproducts/:id
router.get('/:id', (req, res) => {
  db.getByOrderId(req.params.id)
    .then(camelcaseKeys)
    .then(items => res.status(200).json(items))
    .catch(err => res.status(500).send(err.message))
})

// POST /api/v1/ordersproducts/
router.post('/', (req, res) => {
  db.addOrderItem(req.body)
    .then(camelcaseKeys)
    .then(items => res.status(200).json(items))
    .catch(err => res.status(500).send(err.message))
})

// DELETE /api/v1/deleteOrderItem
router.delete('/', (req, res) => {
  db.deleteOrderItem(req.body.orderId, req.body.productId)
    .then(camelcaseKeys)
    .then(() => res.status(200).send())
    .catch(err => res.status(500).send(err.message))
})
