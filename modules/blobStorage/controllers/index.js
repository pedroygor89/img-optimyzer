const Service = require('./../services')
module.exports = {
	download: require('./download')(Service),
	upload: require('./upload')(Service)
}