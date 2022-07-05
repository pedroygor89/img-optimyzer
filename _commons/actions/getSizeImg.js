const axios = require('axios')

module.exports = async (url) => {
    try {
        const response =  await axios.get(url)
        const sizeImage = parseInt(response.headers['content-length'])
        return sizeImage
    } catch (error) {
        return 0
    }
}