var db = require('../db')
var _ = require('lodash')

module.exports = {
  async initMapData(ctx) {
    var topPoint
    var bottomPoint
    var data = {
      topPoint: [],
      bottomPoint: [],
      path: []
    }
    // 获取top点
    await db.Wells.findAll({
      attributes: [['w_top_lng', 'lng'], ['w_top_lat', 'lat'], ['w_uwi', 'uwi'], ['w_operator', 'operator'], ['w_current_status', 'status'], ['w_type', 'type'], ['w_class', 'class'], ['w_pad', 'pad']]
    }).then(well => {
      topPoint = JSON.stringify(well)
      topPoint = JSON.parse(topPoint)
      data.topPoint = topPoint
    })
    // 获取bottom点
    await db.Wells.findAll({
      attributes: [['w_bottom_lng', 'lng'], ['w_bottom_lat', 'lat'], ['w_uwi', 'uwi'], ['w_operator', 'operator'], ['w_current_status', 'status'], ['w_type', 'type'], ['w_class', 'class'], ['w_pad', 'pad']]
    }).then(well => {
      bottomPoint = JSON.stringify(well)
      bottomPoint = JSON.parse(bottomPoint)
      data.bottomPoint = bottomPoint
    })
    // 获取两点连线
    for (var i = 0; i < topPoint.length; i++) {
      data.path = data.path.concat(topPoint[i])
      data.path = data.path.concat(bottomPoint[i])
    }
    data.path = _.chunk(data.path, 2)
    ctx.response.body = data
  }
}
