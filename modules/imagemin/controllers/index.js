const Service = require('./../services')
module.exports = {
	relatorio: require('./relatorio')(Service),
	imagemin: require('./imagemin')(Service)
}