const axios = require('axios');
const css = 'css/style.css';
module.exports = async (urlTheme) => {
	let pathImgs = []

	const indexHtml = urlTheme.substring(urlTheme.lastIndexOf("/")+1);
	const styles = urlTheme.split(indexHtml)[0] + css;

	try {
		let response = await axios.get(styles);
		const regexGetImg = /url(.*?(.jpg|.png))/g
		const listImg = response.data.match(regexGetImg)

		if(listImg) {
			for(let i = 0; i < listImg.length; i++) {
				const path = listImg[i].toString().replace('url', '').replace('(', '')
					.replace(')', '').replace('../', '')
					.replace('\'', '').replace('\"', '')
					.replace('<--', '').replace('-->', '');
				pathImgs.push(path.trim())
			}
		}

		return pathImgs

	} catch (error) {
		return []
	}
}