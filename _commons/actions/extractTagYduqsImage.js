module.exports = async (html) => {
	let pathImgs = []

		const regexGetImg = /<yduqs-image\s*(.*)\s*(.*)\s*(.*)\s*(.*)\s*(.*)>/g

		const listImg = html.match(regexGetImg)
		if(listImg) {
			for (let i = 0; i < listImg.length; i++) {
				// pega o src com caminho da img
				const srcUrl = listImg[i].match(/src\=([^\s]*)\s/)[0];

				// retorna somente o caminho da imagem
				const path = srcUrl.toString().replace(/src[^a-zA-Z0-9]+/, '').replace('\'', '')
					.replace('\"', '').replace('<--', '').replace('-->', '');
				pathImgs.push(path.trim())
			}
		}

		return pathImgs
}