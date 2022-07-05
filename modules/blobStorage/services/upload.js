const azure = require('azure-storage')
// const { BlobServiceClient } = require("@azure/storage-blob");
// const { ContainerClient, BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob")
const dirTree = require("directory-tree");
const { listImg } = require('./inc/getImg')
let fs = require('fs')
const path = require('path')

const blobService = azure.createBlobService(process.env.connectionString)


module.exports = async () => {
	try {

		// 	const blobService = BlobServiceClient.createBlobService(process.env.connectionString)

		// const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.connectionString);
		// const containerClient = blobServiceClient.getContainerClient(process.env.stecine);

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


		// primeira pasta blob
		const container = 'teste'

		blobService.createContainerIfNotExists(container, error => {
			for (let imagem of retorno) {
				const buffer = fs.readFileSync(imagem.path);
				const blob = imagem.path.split('galeria')[1]

				const blobReplace = blob.replace('\\', '\/').replace('/', '');
				blobService.createBlockBlobFromText(container, blobReplace, buffer,  { contentSettings: { contentType: `image/${imagem.name.split('.')[1]}` } }, (error, result) => {
					if (error) {
						console.log(error)
					} else {
						console.dir(result, { depth: null, colors: true })
					}
				})
			}
		})

		} catch (error) {
			console.log(error)
		}
}