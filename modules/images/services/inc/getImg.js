const axios = require('axios')
const extractImgCss = require('./../../../../_commons/actions/extractImgCss')
const extractTagImg = require('../../../../_commons/actions/extractTagImg')
const extractTagYduqsImage = require('../../../../_commons/actions/extractTagYduqsImage')
const extractTagYduqsCover = require('../../../../_commons/actions/extractTagYduqsCover')
const extractTagYduqsModuleCover = require('../../../../_commons/actions/extractTagYduqsModuleCover')
const extractImgSrcSet = require('./../../../../_commons/actions/extractImgSrcSet')
module.exports = async (url) => {
	try {
		let response = await axios.get(url);

		let extractSrcSet = await extractImgSrcSet(response.data)
		let yduqsCover = await extractTagYduqsCover(response.data)
		let yduqsImgCss = await extractImgCss(url)
		let yduqsModuleCover = await extractTagYduqsModuleCover(response.data)
		let yduqsImage = await extractTagYduqsImage(response.data)
		let yduqsImg = await extractTagImg(response.data)
		let listImg = [].concat(yduqsCover, yduqsImage, yduqsImg, yduqsModuleCover, yduqsImgCss, extractSrcSet)

		return listImg
	} catch (error) {
		return error.response.status
	}
	// 			const regex = /<img.+src\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)>/g
	// 			// const regex = /<img.+?src=[\"'](.+?)[\"'].+?>/g
	// 			// const regex = /<img\s+[^>]*?src=("|')([^"']+)/gi
	// 			// const regex = /<([/]*(img)+)\s*[^>]*>([/])*/gi
	// 			// const regex = /src\=([^\s]*)\s/gi
	// 			// const regex = /<img [^>]src="([^"]+)"[^>]>/g
	// 			const listImg = html.match(regex)
}