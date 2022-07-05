const path = require('path')
const jsonImages = require('./../../../_commons/discipline')
const report = require('./inc/report');
const fs = require("fs");
const validUrl = require('./inc/validUrl')
const getImg = require("./inc/getImg")
const getSizeImage = require('../../../_commons/actions/getSizeImg');


module.exports = async () => {
	const UmMega = 1000000
	try {

		const retorno = await jsonImages(path.join(global.contentRoot, 'gif', 'urls.xlsx'));

		for (let theme of retorno) {

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
							if(gallery.search("gif") > 0 || gallery.search("svg") > 0) {
								const sizeImage = await getSizeImage(`${pathTheme.trim()}${gallery.trim()}`)
								const dataImage = {
									urlTema: theme.url,
									imageSize: sizeImage,
									urlImagem: `${pathTheme.trim()}${gallery.trim()}`
								}
								report(dataImage)
							}
						}
					} else {
						for (let gallery of pathGallery) {

							if(gallery.search("gif") > 0 || gallery.search("svg") > 0) {
								const sizeImage = await getSizeImage(`${pathTheme.trim()}${gallery.trim()}`)

								const dataImage = {
									urlTema: theme.url,
									imageSize: sizeImage,
									urlImagem: `${pathTheme.trim()}${gallery.trim()}`
								}
								report(dataImage)
							}
						}
					}
				}
			}
		}

		return 'finalizado'
	} catch (error) {
		return error
	}
}