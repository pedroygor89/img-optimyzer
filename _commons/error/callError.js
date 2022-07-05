
const error = (code, msg) => {
	const err = new Error(msg)
	err.statusCode = code
	return err
 }

 module.exports = error
