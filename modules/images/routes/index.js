const router = require('express').Router()
const Controller = require('../controllers')

router.get('/gif', Controller.listGif)

module.exports = router