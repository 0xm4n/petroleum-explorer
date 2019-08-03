var db = require('../db')
var _ = require('lodash')

module.exports = {
  async runANN(ctx) {
    var responseData = {
      label: [],
      real: [],
      test: [],
      rmse: '',
      pcc: ''
    }
    var lossFunction = ctx.query.lossFunction
    var optimizer = ctx.query.optimizer
    var learningRate = ctx.query.learningRate
    var epochsNum = ctx.query.epochsNum
    var batchSize = ctx.query.batchSize
    var testSize = ctx.query.testSize
    var network = ctx.query.network

    var pythonProcess = new Promise(function(success, nosuccess) {
      var spawn = require('child_process').spawn
      var py = spawn('python3', ['/root/server/script/ann.py', lossFunction, optimizer, learningRate, epochsNum, batchSize, testSize, network])

      py.stdout.on('data', data => {
        success(data.toString())
      })

      py.stderr.on('data', data => {
        // nosuccess(data.toString())
      })
    })

    await pythonProcess.then(response => {
      response = response.replace(/\n/g, '')
      response = response.replace(/\r/g, '')
      response = response.replace(/ {2}/g, ' ')
      response = response.replace(/\[/g, '')
      response = response.replace(/\'/g, '')
      var arr = response.split(']')

      responseData.label = arr[0]
      responseData.label = responseData.label.split(' ')

      responseData.real = arr[1]
      responseData.real = responseData.real.replace(' ', '')
      responseData.real = responseData.real.split(' ')

      responseData.test = arr[2]
      responseData.test = responseData.test.replace(' ', '')
      responseData.test = responseData.test.split(' ')

      responseData.rmse = arr[4].substr(1, 5)

      responseData.pcc = arr[4].substr(7, 5)

      ctx.response.body = responseData
    })
  },
  async runLSTM(ctx) {
    var responseData = {
      label: [],
      real: [],
      test: [],
      rmse: '',
      pcc: ''
    }
    var lossFunction = ctx.query.lossFunction
    var optimizer = ctx.query.optimizer
    var learningRate = ctx.query.learningRate
    var epochsNum = ctx.query.epochsNum
    var batchSize = ctx.query.batchSize
    var testSize = ctx.query.testSize
    var network = ctx.query.network

    var pythonProcess = new Promise(function(success, nosuccess) {
      var spawn = require('child_process').spawn
      var py = spawn('python3', ['/root/server/script/lstm.py', lossFunction, optimizer, learningRate, epochsNum, batchSize, testSize, network])

      py.stdout.on('data', data => {
        success(data.toString())
      })

      py.stderr.on('data', data => {
        // nosuccess(data.toString())
      })
    })

    await pythonProcess.then(response => {
      response = response.replace(/\n/g, '')
      response = response.replace(/\r/g, '')
      response = response.replace(/ {2}/g, ' ')
      response = response.replace(/\[/g, '')
      response = response.replace(/\'/g, '')
      var arr = response.split(']')

      responseData.label = arr[0]
      responseData.label = responseData.label.split(' ')

      responseData.real = arr[1]
      responseData.real = responseData.real.replace(' ', '')
      responseData.real = responseData.real.split(' ')

      responseData.test = arr[2]
      responseData.test = responseData.test.replace(' ', '')
      responseData.test = responseData.test.split(' ')

      responseData.rmse = arr[4].substr(1, 5)

      responseData.pcc = arr[4].substr(7, 5)

      ctx.response.body = responseData
    })
  },
  async getInputData(ctx) {
    var data = {
      label: [],
      '101STM': [],
      '102STM': [],
      '103STM': [],
      '104STM': [],
      '105STM': [],
      '106STM': [],
      '107STM': [],
      '108STM': [],
      '109STM': [],
      '110STM': [],
      '115STM': [],
      '116STM': [],
      '117STM': [],
      'WOR': []

    }
    await db.Suncor_full.findAll({
      attributes: [['Date', 'Date'], ['101STM', '101STM'], ['102STM', '102STM'], ['103STM', '103STM'], ['104STM', '104STM'], ['105STM', '105STM'], ['106STM', '106STM'], ['107STM', '107STM'], ['108STM', '108STM'], ['109STM', '109STM'], ['110STM', '110STM'], ['115STM', '115STM'], ['116STM', '116STM'], ['117STM', '117STM'], ['WOR', 'WOR']]
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
  async getWORData(ctx) {
    var data
    await db.Suncor_full.findAll({
      attributes: [['Date', 'Date'], ['101STM', '101STM'], ['102STM', '102STM'], ['103STM', '103STM'], ['104STM', '104STM'], ['105STM', '105STM'], ['106STM', '106STM'], ['107STM', '107STM'], ['108STM', '108STM'], ['109STM', '109STM'], ['110STM', '110STM'], ['115STM', '115STM'], ['116STM', '116STM'], ['117STM', '117STM'], ['WOR', 'WOR']]
    }).then(WORData => {
      WORData = JSON.stringify(WORData)
      WORData = JSON.parse(WORData)
      data = WORData
      
    })
    ctx.response.body = data
  }
}
