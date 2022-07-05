const fs = require('fs')

module.exports = (pathFolder) => {
	// console.log('pathFolder', pathFolder)
	// console.log('bbbb', pathTheme)
	if (!fs.existsSync(pathFolder))
		fs.mkdirSync(pathFolder)
}
