var db = require('../db')
var _ = require('lodash')

var classNum
var numericalType
var wellsNum
var intervals

function mapFunc(point) {
  for (let i = 0; i < classNum; i++) {
    if (point.queryData >= intervals[i] && point.queryData <= intervals[i + 1]) {
      point.label = intervals[i] + ' - ' + intervals[i + 1]
    }
  }
  delete point.queryData
  return point
}

async function classification(queryAttr) {
  intervals = []
  var data = {
    points: [],
    categoryTypeArr: []
  }
  await db.Wells.count().then(c => {
    wellsNum = c
  })
  await db.Statistics.findAll({
    attributes: [['st_injector_w_id', 'wid'], [queryAttr, 'queryData']]
  }).then(statistic => {
    statistic = JSON.stringify(statistic)
    statistic = JSON.parse(statistic)
    data.points = _.concat(data.points, statistic)
  })
  await db.Statistics.findAll({
    attributes: [['st_producer_w_id', 'wid'], [queryAttr, 'queryData']]
  }).then(statistic => {
    statistic = JSON.stringify(statistic)
    statistic = JSON.parse(statistic)
    data.points = _.concat(data.points, statistic)
  })
  // calculate the interval
  var max = _.maxBy(data.points, 'queryData')
  var min = _.minBy(data.points, 'queryData')
  var interval = (max.queryData - min.queryData) / classNum
  interval = _.ceil(interval)
  // create intervals array
  for (let i = 0; i <= classNum; i++) {
    intervals = intervals.concat(min.queryData + i * interval)
  }

  // create label array
  for (let i = 0; i < classNum; i++) {
    data.categoryTypeArr = data.categoryTypeArr.concat(intervals[i] + ' - ' + intervals[i + 1])
  }
  data.categoryTypeArr = data.categoryTypeArr.concat('invalid')
  // give each point a lebel depend on the value of avgInjHour
  data.points = _.map(data.points, mapFunc)

  // put the invalid point into the points array
  var temp = _.times(wellsNum, (index) => {
    return {
      wid: index + 1,
      label: 'invalid'
    }
  })
  data.points = _.unionBy(data.points, temp, 'wid')
  data.points = _.sortBy(data.points, 'wid')
  return data
}

module.exports = {
  async numericalClassify(ctx) {
    var data
    classNum = ctx.query.classNum
    numericalType = ctx.query.numericalType
    switch (numericalType) {
      case 'Average Injection Hours':
        data = await classification('st_avg_injection_hour')
        ctx.response.body = data
        break
      case 'Average Oil Production':
        data = await classification('st_avg_production_oil')
        ctx.response.body = data
        break
      case 'Average SOR':
        data = await classification('st_avg_sor')
        ctx.response.body = data
        break
      case 'Average Steam Injection':
        data = await classification('st_avg_injection_steam')
        ctx.response.body = data
        break
      case 'Well Drillers Total Depth':
        intervals = []
        data = {
          points: [],
          categoryTypeArr: []
        }
        await db.Wells.findAll({
          attributes: [['w_id', 'wid'], ['w_drillers_total_depth', 'queryData']]
        }).then(statistic => {
          statistic = JSON.stringify(statistic)
          statistic = JSON.parse(statistic)
          data.points = _.concat(data.points, statistic)
        })
        var max = _.maxBy(data.points, 'queryData')
        var min = _.minBy(data.points, 'queryData')
        var interval = (max.queryData - min.queryData) / classNum
        interval = _.ceil(interval)
        // create intervals array
        for (let i = 0; i <= classNum; i++) {
          intervals = intervals.concat(min.queryData + i * interval)
        }
        // create label array
        for (let i = 0; i < classNum; i++) {
          data.categoryTypeArr = data.categoryTypeArr.concat(intervals[i] + ' - ' + intervals[i + 1])
        }
        data.points = _.map(data.points, mapFunc)
        data.points = _.sortBy(data.points, 'wid')
        ctx.response.body = data
        break
    }
  }
}

