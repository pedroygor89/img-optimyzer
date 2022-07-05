const router = require('express').Router()
const Controller = require('../controllers')

router.get('/relatorio', Controller.relatorio)

router.post('/imagemin', Controller.imagemin)

module.exports = router