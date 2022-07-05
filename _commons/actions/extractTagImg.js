module.exports = async (html) => {
	let pathImgs = []

		// const testeRegex = /[\/.](gif|jpg|jpeg|tiff|png)$/i

		// const regexGetImg = /<img.+src\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)\s*(.*)\s*(.*)\s*(.*)\s*(.*)>/g

		const regexGetImg = /src=(.*?(\.jpg|\.png|\.gif|\.svg))/g


		const listImg = html.match(regexGetImg)

		// console.log('fsdfds', listImg)
		if(listImg) {
			for (var i = 0; i < listImg.length; i++) {
				// pega o src com caminho da img
				// const srcUrl = listImg[i].match(/src\=([^\s]*)\s/)[0];

				// retorna somente o caminho da imagem
				const path = listImg[i].toString().replace('\'', '').replace('\"', '').replace('src=./', '').replace('src=', '')
					.replace('\"', '').replace('>', '')
					.replace('<', '').replace('<--', '').replace('-->', '');

				pathImgs.push(path.trim())
			}
		}

		return pathImgs
}