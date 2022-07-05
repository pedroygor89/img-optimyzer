


const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const getImg = require('./_commons/actions/getImg');
const imageminGifsicle = require('imagemin-gifsicle');
const fs = require("fs");

const imageToBase64 = require('image-to-base64');


(async () => {

	const base64Imagem = await imageToBase64('https://stecine.azureedge.net/repositorio/cinematica_de_galileu/img/exemplo6_mobile.jpg')
	const butmap = Buffer.from(base64Imagem, "base64")
	const imagemBuffer = await imagemin.buffer(butmap, {
		plugins: [
			imageminMozjpeg(),
			imageminPngquant(),
			imageminGifsicle()
		]
	});

	const compressedBuffer = imagemBuffer.toString("base64");
	const compressedBitmap = Buffer.from(compressedBuffer, "base64")
	fs.writeFileSync("./teste_exemplo6_mobile.jpg", compressedBitmap)
})();



// (async () => {
// 	// await imagemin(['images/img2.jpg'], {
// 	// await imagemin(['images/*'], {
// 	await imagemin(['https://stecine.blob.core.windows.net/repositorio/00212hu/02059/img/capa-modulo3.jpg'], {
// 		destination: 'compressed',
// 		plugins: [
// 			imageminMozjpeg(),
// 			imageminPngquant()
// 		]
// 	});

// 	console.log('Images optimized');
// })();