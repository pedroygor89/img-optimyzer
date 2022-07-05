const fs = require("fs");
const path = require('path');
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminGifsicle = require('imagemin-gifsicle');
const imageToBase64 = require('image-to-base64');
const createFolder = require('../../../../_commons/actions/create-folder')

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

			const base64Imagem = await imageToBase64(`${pathTheme.trim()}${pathDownload.trim()}`)
			const butmap = Buffer.from(base64Imagem, "base64")
			const imagemBuffer = await imagemin.buffer(butmap, {
				plugins: [
					imageminMozjpeg(),
					imageminPngquant(),
					imageminGifsicle()
				]
			})

			const compressedBuffer = imagemBuffer.toString("base64");
			const compressedBitmap = Buffer.from(compressedBuffer, "base64")

			const urlLocal = path.join(pathImgs.trim(), '\\', img.trim())

			fs.writeFileSync(urlLocal, compressedBitmap)

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
