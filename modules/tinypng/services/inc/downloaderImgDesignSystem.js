const tinify = require("tinify");
tinify.key = process.env.tinifyKey;

const path = require('path');
const createFolder = require('../../../../_commons/actions/create-folder')
const report = require('./report')
const fs = require("fs");

module.exports = async (pathTheme, gallery, pathDownload, folder, sizeImage, theme) => {
		try {
			let pathImgs = global.gallery + '\\' + folder
			let subFolders = gallery.split('/')
			subFolders.pop()

			createFolder(pathImgs)
			for (let index in subFolders) {

				pathImgs += '\\' + subFolders[index]
				// não pega ultimo item array
				if (index < subFolders.length)  {
					createFolder(pathImgs)
				}
			}

			// pega a imagem com extensão - galeria/img/teste.jpg = teste.jpg
			const img = gallery.substring(gallery.lastIndexOf("/")+1)

			console.log(`downlaod system - ${pathTheme.trim()}${pathDownload.trim()}`)

			const source2 = await tinify.fromUrl(`${pathTheme.trim()}${pathDownload.trim()}`)
			await source2.toFile(path.join(pathImgs.trim(), '\\', img.trim()))
			
			console.log(`salvando system - ${path.join(pathImgs.trim(), '\\', img.trim())}`)

			const urlLocal = path.join(pathImgs.trim(), '\\', img.trim())
			const {size: fileSize} = fs.statSync(urlLocal)
			const dataImage = {
				urlImagem: `${pathTheme.trim()}${pathDownload.trim()}`,
				imageAntes: sizeImage,
				imageDepois: fileSize,
				urlTema: theme
			}

			await report(dataImage)

			return true

		} catch (error) {
			return error
		}
}
