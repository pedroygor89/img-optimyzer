module.exports = (Service) => async (req, res, next) => {
	try {
		const listGif = await Service.listGif()
		return global.callback200(res, listGif)
	} catch (error) {
		next(error)
	}
}