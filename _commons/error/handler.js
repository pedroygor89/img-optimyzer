module.exports = (err, req, res, next) => {
	if (err.statusCode) {
		res.status(err.statusCode).json({ msg: err.message })
	} else {
		res.status(500).json({erro: 'Houve um erro interno', msg: err.message})
	}
}
