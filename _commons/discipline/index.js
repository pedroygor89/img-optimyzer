// const path = require('path')
const convertExcel = require('./../actions/convertExcelJson')
const Service = require('./../../modules/imagemin/services')
// const Service = require('./../../modules/tinypng/services')

module.exports = async (url, initial=false) => {
	try {
		const list = await convertExcel(url)
		if(initial) {
			// await Service.compressImage(list)
			await Service.imagemin(list)

		} else {
			return list
		}

	} catch (error) {
		return error
	}
}