const tinify = require("tinify");
tinify.key = process.env.tinifyKey;

const path = require('path')
const createFolder = require('../../../../_commons/actions/create-folder');
const report = require('./report');
const fs = require("fs");

module.exports = async (pathTheme, gallery, folder, sizeImage, theme) => {
		try {
			let pathImgs = global.gallery + '\\' + folder
			let subFolders = gallery.split('/')
			subFolders.pop()

			createFolder(pathImgs)
			for (let index in subFolders) {

				pathImgs += '\\' + subFolders[index]
				// não pega ultimo item do array
				if (index < subFolders.length)  {
					createFolder(pathImgs)
				}
			}


			// pega a imagem com extensão - galeria/img/teste.jpg = teste.jpg
			const img = gallery.substring(gallery.lastIndexOf("/")+1)

			console.log(`downlaod aula - ${pathTheme.trim()}${gallery.trim()}`)
			const source2 = await tinify.fromUrl(`${pathTheme.trim()}${gallery.trim()}`)
			await source2.toFile(path.join(pathImgs.trim(), '\\', img.trim()))

			console.log(`salvando aula - ${path.join(pathImgs.trim(), '\\', img.trim())}`)

			const urlLocal = path.join(pathImgs.trim(), '\\', img.trim())

			const {size: fileSize} = fs.statSync(urlLocal)

			const dataImage = {
				urlImagem: `${pathTheme.trim()}${gallery.trim()}`,
				imageAntes: sizeImage,
				imageDepois: fileSize,
				urlTema: theme
			}

			report(dataImage)

			return true

		} catch (error) {
			return error
		}
}
