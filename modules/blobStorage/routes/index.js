const router = require('express').Router()
const Controller = require('../controllers')

router.post('/download', Controller.download)

router.get('/upload', Controller.upload)

module.exports = router