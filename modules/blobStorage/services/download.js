const { BlobServiceClient } = require("@azure/storage-blob");
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminGifsicle = require('imagemin-gifsicle');
const imageToBase64 = require('image-to-base64');


const path = require('path')


module.exports = async (body) => {
	try {

		const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.connectionString);

		// const containerClient = blobServiceClient.getContainerClient('webaula');
		// let blobs = containerClient.listBlobsFlat({prefix: 'estacio/001EDO/imgs/'});

		for( const list of body) {
			const subPath = list.url.split('net/')[1]

			// html que carrega primeira página
			const initial = subPath.substring(subPath.lastIndexOf("/")+1)

			// split na url com html que carrega primeira página
			const paste = subPath.split(initial)[0]

			// pega a ocorrência depois da primeira '/'
			const subPaste = paste.substring(paste.indexOf("/") + 1)

			// pega primeira ocorrência antes da primeira '/'
			const blobInitial = paste.split(subPaste)[0]

			const containerClient = blobServiceClient.getContainerClient(blobInitial.replace('/', ''));


			let blobs = containerClient.listBlobsFlat({prefix: `${subPaste}img/`});


			for await (const blob of blobs) {
				if (blob.name.search('gif') > 0 || blob.name.search('png') > 0 || blob.name.search('jpg') > 0) {
					const teste = list.url.split(blobInitial)[0]
					console.log(`Blob ${teste}${blobInitial}${blob.name}`);


					const base64Imagem = await imageToBase64(`${teste}${blobInitial}${blob.name}`);
					const butmap = Buffer.from(base64Imagem, "base64");
					const imagemBuffer = await imagemin.buffer(butmap, {
						plugins: [
							imageminMozjpeg(),
							imageminPngquant(),
							imageminGifsicle()
						]
					})



					const compressedBuffer = imagemBuffer.toString("base64");

					console.log('kkkkkkkk', compressedBuffer)

					blobService.createBlockBlobFromText(container, blobReplace, buffer,  { contentSettings: { contentType: `image/${imagem.name.split('.')[1]}` } }, (error, result) => {
						if (error) {
							console.log(error)
						} else {
							console.dir(result, { depth: null, colors: true })
						}
					})

				}
			}
		}

		// for await (const blob of blobs) {
		// 	console.log(`Blob ${blob.name}`);
		// }


		} catch (error) {
			console.log(error)
		}
}