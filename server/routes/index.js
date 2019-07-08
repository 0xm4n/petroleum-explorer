var Router = require('koa-router')
var router = new Router()

var Wells = require('../controllers/wells-data.js')
var Search = require('../controllers/search.js')
var Classification = require('../controllers/classification.js')

router.get('/initMapData', Wells.initMapData)

router.get('/searchByUWI', Search.searchByUWI)
router.get('/searchByStatus', Search.searchByStatus)
router.get('/numericalClassify', Classification.numericalClassify)

module.exports = router

