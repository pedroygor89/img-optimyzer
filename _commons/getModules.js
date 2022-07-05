const fs = require('fs')

const getModulesFrom = (modulePath) =>
	fs.readdirSync(modulePath)

module.exports = (modulePath) => getModulesFrom(modulePath)
