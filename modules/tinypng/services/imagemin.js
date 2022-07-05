const path = require('path')

const downloadImg = require('./imagemin/downloaderImg')
const downloaderImgDesignSystem = require('./imagemin/downloaderImgDesignSystem')

const getSizeImage = require('../../../_commons/actions/getSizeImg');
const validUrl = require('./inc/validUrl')
const getImg = require("./inc/getImg")
const jsonImages = require('./../../../_commons/actions/convertCsvJson')

const verifyImage = (listImages, urlImagem) => {
	return listImages.some(image => image.urlImagem === urlImagem)
}

module.exports = async (body) => {
	try {
		// const source2 = tinify.fromUrl('https://stecine.blob.core.windows.net/webaula/estacio/go0054/galeria/aula1/img/img1.jpg')
		// source2.toFile(path.join(global.gallery, 'go0054', 'img1.jpg'))

		console.log('###INICIANDO###')
		for (let theme of body) {
			const listImages = await jsonImages(path.join(global.contentRoot,  'relatorio', 'report.csv'), true);

			const indexHtml = theme.url.substring(theme.url.lastIndexOf("/")+1)

			const pathTheme = theme.url.toString().split(indexHtml)[0]

			// 1 - url possui repositorio/ na url - pode ser design system ou tema antigo
			// 2 - url possui estacio/ - é modelo aula
			// 3 - exemplo retorno - 00212hu/01486/index.html ou 01486/index.html
			const subUrls = theme.url.match(/repositorio/gi) !== null ? theme.url.split('repositorio/')[1] : theme.url.split('estacio/')[1]

			const arraySubUrls = subUrls.split('/')
			arraySubUrls.pop() // retira ultimo elemento array
			const folder = arraySubUrls.shift() // retira primeiro elemento array


			const subFolders = arraySubUrls.toString().replace(',', '/')

			if (await validUrl(theme.url) === 200) {
				let pathGallery = await getImg(theme.url)

				if (pathGallery.length) {
					// retira imagens que possui repositorio no path, pois não fica dentro do tema
					pathGallery = pathGallery.filter(img => !img.match(/repositorio/gi))
					if(subFolders.length) {
						for (let gallery of pathGallery) {
							const sizeImage = await getSizeImage(`${pathTheme.trim()}${gallery.trim()}`)

							if(sizeImage > 0 && ((parseInt(sizeImage / 1000)) > 20) && gallery.search("gif") < 0
								&& gallery.search("svg") < 0 && verifyImage(listImages, pathTheme.trim()+''+gallery.trim()) === false) {
								await downloaderImgDesignSystem(pathTheme, subFolders+'/'+gallery, gallery, folder, sizeImage, theme.url)

							}
						}
					} else {
						for (let gallery of pathGallery) {
							const sizeImage = await getSizeImage(`${pathTheme.trim()}${gallery.trim()}`)
							if(sizeImage > 0 && ((parseInt(sizeImage / 1000)) > 20) && gallery.search("gif") < 0
							&& gallery.search("svg") < 0 && verifyImage(listImages, pathTheme.trim()+''+gallery.trim()) === false) {
								await downloadImg(pathTheme, gallery, folder, sizeImage, theme.url)
							}
						}
					}
				}
			}
		}
		console.log('####FINALIZADO###')
		return 'finalizado'
	} catch (error) {
		return error
	}
}