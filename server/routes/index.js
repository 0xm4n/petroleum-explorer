var Router = require('koa-router');
var router = new Router();

var Wells = require('../controllers/wells-data.js')

router.get('/getWellsTopPoint',Wells.getWellsTopPoint);
router.get('/getWellsBottomPoint',Wells.getWellsBottomPoint);
router.get('/getWellsPath',Wells.getWellsPath);

module.exports = router

