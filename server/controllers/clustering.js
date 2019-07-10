var db = require('../db')
var _ = require('lodash')

const kmeans = require('ml-kmeans')
var checkList
var clusterNum

var wellsQueryAttribute = []
var statisticsQueryAttribute = []

var dataFromWells
var dataFromStatistics
var data = []

var attributeArr

module.exports = {
  async clusterKmeans(ctx) {
    checkList = ctx.query.checkList
    clusterNum = ctx.query.clusterNum
    clusterNum = parseInt(clusterNum)
    console.log('checkList = ', checkList)
    console.log('clusterNum = ', clusterNum)
    // get the total number of the wells
    var wellsNum
    await db.Wells.count().then(c => {
      wellsNum = c
    })

    // get the data from table Wells
    if (_.includes(checkList, 'Drillers Depth')) {
      wellsQueryAttribute = wellsQueryAttribute.concat('w_drillers_total_depth')
    }
    if (_.includes(checkList, 'Location')) {
      wellsQueryAttribute = wellsQueryAttribute.concat('w_bottom_lng', 'w_bottom_lat', 'w_top_lng', 'w_top_lat')
    }
    await db.Wells.findAll({
      attributes: wellsQueryAttribute
    }).then(statistic => {
      statistic = JSON.stringify(statistic)
      statistic = JSON.parse(statistic)
      dataFromWells = statistic
    })

    // get all attributes' value from the object and store the value in a array
    attributeArr = wellsQueryAttribute
    dataFromWells = _.map(dataFromWells, (o) => {
      var temp = []
      var objectLength = _.keys(o).length
      for (let i = 0; i < objectLength; i++) {
        var attrName = attributeArr[i]
        temp[i] = o[attrName]
      }
      return temp
    })

    // get the data from table Statistics
    if (_.includes(checkList, 'SOR')) {
      statisticsQueryAttribute = statisticsQueryAttribute.concat('st_avg_sor')
    }
    if (_.includes(checkList, 'Injection Hours')) {
      statisticsQueryAttribute = statisticsQueryAttribute.concat('st_avg_injection_hour')
    }
    if (_.includes(checkList, 'Oil Production')) {
      statisticsQueryAttribute = statisticsQueryAttribute.concat('st_avg_production_oil')
    }
    if (_.includes(checkList, 'Steam Injection')) {
      statisticsQueryAttribute = statisticsQueryAttribute.concat('st_avg_injection_steam')
    }
    var temp = [['st_injector_w_id', 'w_id']]
    temp = temp.concat(statisticsQueryAttribute)
    await db.Statistics.findAll({
      attributes: temp
    }).then(statistic => {
      statistic = JSON.stringify(statistic)
      statistic = JSON.parse(statistic)
      dataFromStatistics = statistic
    })
    temp = [['st_producer_w_id', 'w_id']]
    temp = temp.concat(statisticsQueryAttribute)
    await db.Statistics.findAll({
      attributes: temp
    }).then(statistic => {
      statistic = JSON.stringify(statistic)
      statistic = JSON.parse(statistic)
      dataFromStatistics = dataFromStatistics.concat(statistic)
    })

    // get all attributes' value from the object and store the value in a array
    attributeArr = ['w_id']
    attributeArr = attributeArr.concat(statisticsQueryAttribute)
    dataFromStatistics = _.map(dataFromStatistics, (o) => {
      var temp = []
      var objectLength = _.keys(o).length
      for (let i = 0; i < objectLength; i++) {
        var attrName = attributeArr[i]
        temp[i] = o[attrName]
      }
      return temp
    })

    // create an array which has wellNum elements and fill all attribute with value 0
    var voidArr = _.times(wellsNum, (index) => {
      var arr = [index + 1]
      var objectLength = dataFromStatistics[0].length
      for (let i = 1; i < objectLength; i++) {
        arr[i] = 0
      }
      return arr
    })

    // conbine the void array with the vaild array
    dataFromStatistics = _.unionBy(dataFromStatistics, voidArr, (arr) => {
      return arr[0]
    })
    dataFromStatistics = _.sortBy(dataFromStatistics, (arr) => {
      return arr[0]
    })

    // merge the dataFromWells and dataFromStatistics
    for (let i = 0; i < wellsNum; i++) {
      data[i] = dataFromStatistics[i].concat(dataFromWells[i])
      data[i] = _.drop(data[i])
    }

    // use K-means to classify all the point
    var ans = kmeans(data, clusterNum)
    ans = ans.clusters

    // return the response data
    var response = {
      'points': [],
      'categoryTypeArr': []
    }
    response.points = _.times(wellsNum, (index) => {
      return {
        'wid': index + 1,
        'label': 'Cluster' + ans[index]
      }
    })
    response.categoryTypeArr = _.times(clusterNum, (index) => {
      return 'Cluster' + index
    })
    ctx.response.body = response
  }
}
