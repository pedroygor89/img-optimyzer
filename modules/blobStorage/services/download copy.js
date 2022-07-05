// const azure = require('azure-storage')
// const { BlobServiceClient } = require("@azure/storage-blob");
const { ContainerClient, BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob")
const dirTree = require("directory-tree");
const { listImg } = require('./inc/getImg')
let fs = require('fs')
const path = require('path')
module.exports = async () => {
	try {

	// 	const blobService = BlobServiceClient.createBlobService(process.env.connectionString)

		const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.connectionString);
		const containerClient = blobServiceClient.getContainerClient(process.env.stecine);

		// lista containers
		// for await (const blob of blobServiceClient.listContainers()) {
		// 	console.log('\t', blob.name);
		// }

		// lista blobs
		// for await (const blob of containerClient.listBlobsFlat({ prefix: 'img' })) {
		// 	console.log('\t', blob.name);
		// }



		// for await (const blob of containerClient.listBlobsFlat('webaula\\estacio')) {
		// 	console.log('teste \t', blob.name);
		// }


		const tree = dirTree("C:\\Users\\Clemilson\\Documents\\Estacio\\api_tinifypng\\galeria",
		{
			extensions: /\.(png|jpg|jpeg)$/
		});

		const retorno = await listImg(tree)

		let options = { contentType: 'image/png' };

		const buffer = fs.readFileSync( retorno[0].path , 'utf8');
		const blob = retorno[0].path.split('galeria')[1]

		const blobFinal = path.join('teste', blob)

		blobServiceClient.createBlockBlobFromText(process.env.stecine, blobFinal, buffer, { contentSettings: { options } }, (error, result) => {
			if (error) console.log(error)
			console.dir(result, { depth: null, colors: true })
		})


		// blobServiceClient.createFileFromStream(process.env.stecine, dirPath, fileName, body, length, function(error, result, resp) {
		// 	if (!error) {
		// 		// file uploaded
		// 		response.send(statusCodes.OK, "File Uploaded");
		// 	}else{
		// 		response.send(statusCodes.OK, "Error!");
		// 	}
		// })
		console.log('-------------', blobFinal)


		} catch (error) {
			console.log(error)
		}
}