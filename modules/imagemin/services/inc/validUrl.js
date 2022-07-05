const axios = require('axios')
module.exports = async (url) => {
	try {
		// faz requisição url para verificar url
		let response = await axios.get(url);
		return response.status
	} catch (error) {
		return error.response.status
	}
}