module.exports = async (html) => {
	let pathImgs = []

		const regexGetImg = /img_cover\=(?:\"|\')(.+?)(?:\"|\')/g

		const listImg = html.match(regexGetImg)
		if(listImg) {
			for (var i = 0; i < listImg.length; i++) {

				const path = listImg[i].toString().replace(/img_cover="/, '')
				.replace('\"', '').replace('<--', '').replace('-->', '');
				pathImgs.push(path.trim());
			}
		}

		return pathImgs
}