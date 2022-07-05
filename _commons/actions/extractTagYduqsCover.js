module.exports = async (html) => {
	let pathImgs = []

		const regexGetImg = /<yduqs-cover\s*(.*)\s*(.*)\s*(.*)\s*(.*)\s*(.*)\s*(.*)\s*(.*)\s*(.*)\s*(.*)\s*(.*)>/g

		const listImg = html.match(regexGetImg);

		if(listImg) {
			for (var i = 0; i < listImg.length; i++) {
				// pega o src com caminho da img
				const srcUrl = listImg[i].match(/background_img\=([^\s]*)\s/)[0];

				// retorna somente o caminho da imagem
				const path = srcUrl.toString().replace(/background_img[^a-zA-Z0-9]+/, '')
				.replace('\'', '').replace('\"', '')
				.replace('<--', '').replace('-->', '');
				pathImgs.push(path.trim());
			}
		}

		return pathImgs
}