module.exports = (Service) => async (req, res, next) => {
	try {
		const project = await Service.compressImage(req.body)
		return global.callback200(res, project)
	} catch (error) {
		next(error)
	}
}