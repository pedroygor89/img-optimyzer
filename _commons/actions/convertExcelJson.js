const xlsxtojson = require('xlsx-to-json')

const convertXlsxToJson = (url) => new Promise((resolve, reject) => {
	xlsxtojson({
		input: url,
		output: null,
		lowerCaseHeaders: true
	}, function (err, result) {
		if (err) {
			reject(err)
		} else {
			resolve(result)
		}
	})
})

module.exports = convertXlsxToJson