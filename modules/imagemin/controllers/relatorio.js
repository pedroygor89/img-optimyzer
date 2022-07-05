module.exports = (Service) => async (req, res, next) => {
	try {
		const list = await Service.relatorio()
		return global.callback200(res, list)
	} catch (error) {
		next(error)
	}
}