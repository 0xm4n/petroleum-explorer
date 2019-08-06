var db = require('../db')
var _ = require('lodash')
var http = require('../utils/http')
// import http from '../utils/http'

module.exports = {
  async runANN(ctx) {
    var responseData = {
    }
    var lossFunction = ctx.query.lossFunction
    var optimizer = ctx.query.optimizer
    var learningRate = ctx.query.learningRate
    var epochsNum = ctx.query.epochsNum
    var batchSize = ctx.query.batchSize
    var testSize = ctx.query.testSize
    var network = ctx.query.network

    await http.get('/neural_network/ann', {
      params: {
        lossFunction,
        optimizer,
        learningRate,
        epochsNum,
        batchSize,
        testSize,
        network

      }
    }).then(function(response) {
      responseData.test = response.data.test
      responseData.real = response.data.real
      responseData.label = response.data.label
      responseData.pcc = response.data.pcc
      responseData.rmse = response.data.rmse
    })
    ctx.response.body = responseData
  },
  async runLSTM(ctx) {
    var responseData = {
    }
    var lossFunction = ctx.query.lossFunction
    var optimizer = ctx.query.optimizer
    var learningRate = ctx.query.learningRate
    var epochsNum = ctx.query.epochsNum
    var batchSize = ctx.query.batchSize
    var testSize = ctx.query.testSize
    var network = ctx.query.network

    await http.get('/neural_network/lstm', {
      params: {
        lossFunction,
        optimizer,
        learningRate,
        epochsNum,
        batchSize,
        testSize,
        network

      }
    }).then(function(response) {
      responseData.test = response.data.test
      responseData.real = response.data.real
      responseData.label = response.data.label
      responseData.pcc = response.data.pcc
      responseData.rmse = response.data.rmse
    })
    ctx.response.body = responseData
  },
  async getDataSeries(ctx) {
    var data = {
      label: []
    }
    await db.Suncor_full.findAll({
      attributes: [
        ['Date', 'Date'],
        ['101STM', '101STM'],
        ['102STM', '102STM'],
        ['103STM', '103STM'],
        ['104STM', '104STM'],
        ['105STM', '105STM'],
        ['106STM', '106STM'],
        ['107STM', '107STM'],
        ['108STM', '108STM'],
        ['109STM', '109STM'],
        ['110STM', '110STM'],
        ['115STM', '115STM'],
        ['116STM', '116STM'],
        ['117STM', '117STM'],
        ['WOR', 'WOR']
      ]
    }).then(suncorData => {
      suncorData = JSON.stringify(suncorData)
      suncorData = JSON.parse(suncorData)
      data.label = _.map(suncorData, (o) => {
        return o.Date
      })
      data['101STM'] = _.map(suncorData, (o) => {
        return o['101STM']
      })
      data['102STM'] = _.map(suncorData, (o) => {
        return o['102STM']
      })

      data['103STM'] = _.map(suncorData, (o) => {
        return o['103STM']
      })
      data['104STM'] = _.map(suncorData, (o) => {
        return o['104STM']
      })
      data['105STM'] = _.map(suncorData, (o) => {
        return o['105STM']
      })
      data['106STM'] = _.map(suncorData, (o) => {
        return o['106STM']
      })
      data['107STM'] = _.map(suncorData, (o) => {
        return o['107STM']
      })
      data['108STM'] = _.map(suncorData, (o) => {
        return o['108STM']
      })
      data['109STM'] = _.map(suncorData, (o) => {
        return o['109STM']
      })
      data['110STM'] = _.map(suncorData, (o) => {
        return o['110STM']
      })
      data['115STM'] = _.map(suncorData, (o) => {
        return o['115STM']
      })
      data['116STM'] = _.map(suncorData, (o) => {
        return o['116STM']
      })
      data['117STM'] = _.map(suncorData, (o) => {
        return o['117STM']
      })
      data['WOR'] = _.map(suncorData, (o) => {
        return o['WOR']
      })
    })
    ctx.response.body = data
  },
  async getDataTable(ctx) {
    var data
    await db.Suncor_full.findAll({
      attributes: [
        ['Date', 'Date'],
        ['101STM', '101STM'],
        ['102STM', '102STM'],
        ['103STM', '103STM'],
        ['104STM', '104STM'],
        ['105STM', '105STM'],
        ['106STM', '106STM'],
        ['107STM', '107STM'],
        ['108STM', '108STM'],
        ['109STM', '109STM'],
        ['110STM', '110STM'],
        ['115STM', '115STM'],
        ['116STM', '116STM'],
        ['117STM', '117STM'],
        ['WOR', 'WOR']
      ]
    }).then(WORData => {
      WORData = JSON.stringify(WORData)
      WORData = JSON.parse(WORData)
      data = WORData
    })
    ctx.response.body = data
  }
}
