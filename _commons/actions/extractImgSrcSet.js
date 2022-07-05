module.exports = async (html) => {
	let pathImgs = []

		const regexGetImg = /srcset=(.*?(.jpg|.png))/g
		const listImg = html.match(regexGetImg)

		if(listImg) {
			for(let i = 0; i < listImg.length; i++) {
				const path = listImg[i].toString().replace('srcset=', '')
					.replace('../', '').replace('./', '')
					.replace('\'', '').replace('\"', '')
					.replace('<--', '').replace('-->', '');

				if(!pathImgs.includes(path.trim())) {
					pathImgs.push(path.trim())
				}
			}
		}

		return pathImgs

	}