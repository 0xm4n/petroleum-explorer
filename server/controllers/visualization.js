var db = require('../db')
var _ = require('lodash')

module.exports = {
  async getBarChart(ctx) {
    const type = ctx.query.type
    var queryAttr
    switch (type) {
      case 'Average Injection Hours':
        queryAttr = 'st_avg_injection_hour'
        break
      case 'Average Oil Production':
        queryAttr = 'st_avg_production_oil'
        break
      case 'Average SOR':
        queryAttr = 'st_avg_sor'
        break
      case 'Average Steam Injection':
        queryAttr = 'st_avg_injection_steam'
        break
      case 'Well Drillers Total Depth':
        break
    }

    db.Statistics.belongsTo(db.Wells, { foreignKey: 'st_injector_w_id' })
    var data = {
      categoryData: [],
      valueData: []
    }
    var points = []
    await db.Statistics.findAll({
      include: [{
        model: db.Wells,
        required: true,
        attributes: [['w_uwi', 'uwi'], ['w_operator', 'operator'], ['w_current_status', 'status']]
      }],
      attributes: [['st_injector_w_id', 'wid'], [queryAttr, 'value']]
    }).then(statistic => {
      statistic = JSON.stringify(statistic)
      statistic = JSON.parse(statistic)
      points = _.concat(points, statistic)
    })
    db.Statistics.belongsTo(db.Wells, { foreignKey: 'st_producer_w_id' })
    await db.Statistics.findAll({
      include: [{
        model: db.Wells,
        required: true,
        attributes: [['w_uwi', 'uwi'], ['w_operator', 'operator'], ['w_current_status', 'status']]
      }],
      attributes: [['st_producer_w_id', 'wid'], [queryAttr, 'value']]
    }).then(statistic => {
      statistic = JSON.stringify(statistic)
      statistic = JSON.parse(statistic)
      points = _.concat(points, statistic)
    })
    points = _.sortBy(points, 'wid')

    data.categoryData = _.map(points, (o) => {
      return {
        value: o.value,
        uwi: o.well.uwi,
        operator: o.well.operator,
        status: o.well.status
      }
    })
    data.valueData = _.map(points, (o) => {
      return o.wid
    })
    ctx.response.body = data
  },
  async getPieChart(ctx) {
    const type = ctx.query.type
    var queryAttr
    switch (type) {
      case 'Well Class':
        queryAttr = 'w_class'
        break
      case 'Well Current Status':
        queryAttr = 'w_current_status'
        break
      case 'Well Operator':
        queryAttr = 'w_operator'
        break
      case 'Well Province':
        queryAttr = 'w_province'
        break
      case 'Well Type':
        queryAttr = 'w_type'
        break
      case 'Pad':
        queryAttr = 'w_pad'
        break
    }

    var data = {
      value: [],
      label: []
    }
    var responseData
    await db.Wells.findAll({
      attributes: [[queryAttr, 'attributeVal']]
    }).then(statistic => {
      statistic = JSON.stringify(statistic)
      statistic = JSON.parse(statistic)
      responseData = statistic
    })
    responseData = _.map(responseData, (o) => {
      return o.attributeVal
    })
    data.label = _.uniq(responseData)
    data.value = _.times(data.label.length, (index) => {
      return {
        value: 0,
        name: data.label[index]
      }
    })
    for (let i = 0; i < responseData.length; i++) {
      for (let j = 0; j < responseData.length; j++) {
        if (responseData[i] === data.label[j]) {
          data.value[j].value++
        }
      }
    }
    ctx.response.body = data
  }
}
