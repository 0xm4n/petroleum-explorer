
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
  }

}
