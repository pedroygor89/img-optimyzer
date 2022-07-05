module.exports = (Service) => async (req, res, next) => {
	try {
		const list = await Service.download(req.body)
		return global.callback200(res, list)
	} catch (error) {
		next(error)
	}
}