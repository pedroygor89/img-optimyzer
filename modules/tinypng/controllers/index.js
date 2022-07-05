const Service = require('./../services')
module.exports = {
	compressImage: require('./compressImage')(Service),
	relatorio: require('./relatorio')(Service),
	imagemin: require('./imagemin')(Service)
}