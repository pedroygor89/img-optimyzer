const dotenv = require('dotenv')
// require('./_commons/db/config')()

const path = require('path')
dotenv.config({ path: path.join(process.cwd(), `.env.${process.env.NODE_ENV}`) })


require('./_commons/globals')
const express = require('express')
const errorHandler = require('./_commons/error/handler')
const disciplineConvert = require('./_commons/discipline')


const app = express()

app.use(express.json())

let api = {}
let modules = require('./_commons/getModules')('./modules/')
const createRoutes = (element) => {
	api[element] = require('./modules/' + element + '/routes')
	app.use('/api/' + element, api[element])
}
modules.forEach(createRoutes)

app.use((req, res, next) => res.status(404).json({ msg: 'Rota não encontrada' }))

disciplineConvert(path.join(global.contentRoot, 'urls.xlsx'), true)

app.listen(3000, () => {
	console.log(`Inicializado: http://localhost:${process.env.port}/api/`)
})

app.use(errorHandler)

module.exports = app
