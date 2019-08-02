var db = require('../db')
var _ = require('lodash')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  // UWI搜索
  async searchByUWI(ctx) {
    const uwi = ctx.query.uwi
    var topPoint
    var bottomPoint
    var data = {
      topPoint: [],
      bottomPoint: [],
      path: []
    }
    // 获取top点
    await db.Wells.findAll({
      where: {
        w_uwi: uwi
      },
      attributes: [['w_top_lng', 'lng'], ['w_top_lat', 'lat'], ['w_uwi', 'uwi'], ['w_operator', 'operator'], ['w_current_status', 'status'], ['w_type', 'type']]
    }).then(well => {
      topPoint = JSON.stringify(well)
      topPoint = JSON.parse(topPoint)
    })
    // 获取bottom点
    await db.Wells.findAll({
      where: {
        w_uwi: uwi
      },
      attributes: [['w_bottom_lng', 'lng'], ['w_bottom_lat', 'lat'], ['w_uwi', 'uwi'], ['w_operator', 'operator'], ['w_current_status', 'status'], ['w_type', 'type']]
    }).then(well => {
      bottomPoint = JSON.stringify(well)
      bottomPoint = JSON.parse(bottomPoint)
    })
    data.topPoint = data.topPoint.concat(topPoint[0])
    data.bottomPoint = data.bottomPoint.concat(bottomPoint[0])
    data.path = data.path.concat(topPoint[0])
    data.path = data.path.concat(bottomPoint[0])
    data.path = _.chunk(data.path, 2)
    // 获取两点连线
    ctx.response.body = data
  },
  // UWI Field搜索
  async searchByUWIField(ctx) {
    const first = ctx.query.first
    const lsd = ctx.query.lsd
    const sec = ctx.query.sec
    const twp = ctx.query.twp
    const rng = ctx.query.rng
    const mer = ctx.query.mer
    const last = ctx.query.last
    var topPoint
    var bottomPoint
    var data = {
      topPoint: [],
      bottomPoint: [],
      path: []
    }
    // 获取top点
    await db.Wells.findAll({
      where: {
        w_uwi: {
          [Op.like]: first+'%/' + lsd + '%-' + sec + '%-' + twp + '%-' + rng + '%W' + mer + '%/' + last + '%'
        }
      },
      attributes: [['w_top_lng', 'lng'], ['w_top_lat', 'lat'], ['w_uwi', 'uwi'], ['w_operator', 'operator'], ['w_current_status', 'status'], ['w_type', 'type']]
    }).then(well => {
      topPoint = JSON.stringify(well)
      topPoint = JSON.parse(topPoint)
    })
    // 获取bottom点
    await db.Wells.findAll({
      where: {
        w_uwi: {
          [Op.like]: first+'%/' + lsd + '%-' + sec + '%-' + twp + '%-' + rng + '%W' + mer + '%/' + last + '%'
        }
      },
      attributes: [['w_bottom_lng', 'lng'], ['w_bottom_lat', 'lat'], ['w_uwi', 'uwi'], ['w_operator', 'operator'], ['w_current_status', 'status'], ['w_type', 'type']]
    }).then(well => {
      bottomPoint = JSON.stringify(well)
      bottomPoint = JSON.parse(bottomPoint)
    })
    data.topPoint = data.topPoint.concat(topPoint[0])
    data.bottomPoint = data.bottomPoint.concat(bottomPoint[0])
    data.path = data.path.concat(topPoint[0])
    data.path = data.path.concat(bottomPoint[0])
    data.path = _.chunk(data.path, 2)
    // 获取两点连线
    ctx.response.body = data
  },
  // Status搜索
  async searchByStatus(ctx) {
    const status = ctx.query.status
    var topPoint
    var bottomPoint
    var data = {
      topPoint: [],
      bottomPoint: [],
      path: []
    }
    // 获取top点
    await db.Wells.findAll({
      where: {
        w_current_status: status
      },
      attributes: [['w_top_lng', 'lng'], ['w_top_lat', 'lat'], ['w_uwi', 'uwi'], ['w_operator', 'operator'], ['w_current_status', 'status'], ['w_type', 'type']]
    }).then(well => {
      topPoint = JSON.stringify(well)
      topPoint = JSON.parse(topPoint)
      data.topPoint = topPoint
    })
    // 获取bottom点
    await db.Wells.findAll({
      where: {
        w_current_status: status
      },
      attributes: [['w_bottom_lng', 'lng'], ['w_bottom_lat', 'lat'], ['w_uwi', 'uwi'], ['w_operator', 'operator'], ['w_current_status', 'status'], ['w_type', 'type']]
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
