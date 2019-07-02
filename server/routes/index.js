var Router = require('koa-router')
var router = new Router()

var Wells = require('../controllers/wells-data.js')
var Search = require('../controllers/search.js')

router.get('/initMapData', Wells.initMapData)

router.get('/searchByUWI', Search.searchByUWI)
router.get('/searchByStatus', Search.searchByStatus)

module.exports = router

