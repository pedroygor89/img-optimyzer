const axios = require('axios')

module.exports = async (url) => {
    try {
        const response =  await axios.get(url)
        return Buffer.from(response.data)
    } catch (error) {
        return error
    }
}