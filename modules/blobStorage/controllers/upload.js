module.exports = (Service) => async (req, res, next) => {
	try {
		const list = await Service.upload()
		return global.callback200(res, list)
	} catch (error) {
		next(error)
	}
}