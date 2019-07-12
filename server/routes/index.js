var Router = require('koa-router')
var router = new Router()

var Wells = require('../controllers/wells-data.js')
var Search = require('../controllers/search.js')
var Classification = require('../controllers/classification.js')
var Clustering = require('../controllers/clustering.js')
var Visualization = require('../controllers/visualization.js')
var TimeSeries = require('../controllers/time-series.js')

router.get('/initMapData', Wells.initMapData)

router.get('/searchByUWI', Search.searchByUWI)
router.get('/searchByStatus', Search.searchByStatus)
router.get('/numericalClassify', Classification.numericalClassify)
router.get('/clusterKmeans', Clustering.clusterKmeans)
router.get('/getBarChart', Visualization.getBarChart)
router.get('/getPieChart', Visualization.getPieChart)
router.get('/getTimeSeries', TimeSeries.getTimeSeries)

module.exports = router

