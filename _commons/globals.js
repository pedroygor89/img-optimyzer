const path = require('path')
global.callback200 = require('./http-status-code').http200
global.appRoot = path.resolve(process.cwd())
global.gallery = path.join(global.appRoot, 'galeria')
global.contentRoot = path.join(global.appRoot, '_content')
global.erros = require('./error/message')
global.tinifyKey = process.env.TinifyKey
