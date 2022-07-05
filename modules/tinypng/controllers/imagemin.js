module.exports = (Service) => async (req, res, next) => {
	try {
		const imagemin = await Service.imagemin(req.body)
		return global.callback200(res, imagemin)
	} catch (error) {
		next(error)
	}
}