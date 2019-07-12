var db = require('../db')
var _ = require('lodash')

var responseData

async function getInjectionData(w_id) {
  await db.Injection.findAll({
    where: {
      w_id: w_id,
      i_prod_type: 'I-STEAM'
    },
    attributes: [['w_id', 'w_id'], ['i_month', 'month'], ['i_year', 'year'], ['i_value', 'value']]
  }).then(injectionData => {
    injectionData = _.sortBy(injectionData, ['year', 'month'])
    injectionData = JSON.stringify(injectionData)
    injectionData = JSON.parse(injectionData)
    responseData.label = _.map(injectionData, (o) => {
      return o.year + '-' + o.month
    })
    responseData.hourData = _.map(injectionData, (o) => {
      return o.value
    })
  })
  await db.Injection.findAll({
    where: {
      w_id: w_id,
      i_prod_type: 'I-STEAM'
    },
    attributes: [['w_id', 'w_id'], ['i_month', 'month'], ['i_year', 'year'], ['i_value', 'value']]
  }).then(injectionData => {
    injectionData = _.sortBy(injectionData, ['year', 'month'])
    injectionData = JSON.stringify(injectionData)
    injectionData = JSON.parse(injectionData)
    responseData.label = _.map(injectionData, (o) => {
      return o.year + '-' + o.month
    })
    responseData.streamData = _.map(injectionData, (o) => {
      return o.value
    })
  })
  await db.Injection.findAll({
    where: {
      w_id: w_id,
      i_prod_type: 'I-HOUR'
    },
    attributes: [['w_id', 'w_id'], ['i_month', 'month'], ['i_year', 'year'], ['i_value', 'value']]
  }).then(injectionData => {
    injectionData = _.sortBy(injectionData, ['year', 'month'])
    injectionData = JSON.stringify(injectionData)
    injectionData = JSON.parse(injectionData)
    responseData.hourData = _.map(injectionData, (o) => {
      return o.value
    })
  })
}

async function getProductionData(w_id) {
  await db.Production.findAll({
    where: {
      w_id: w_id
    },
    attributes: [['w_id', 'w_id'], ['p_month', 'month'], ['p_year', 'year'], 'p_cml_hours', 'p_cml_gas', 'p_cml_oil_bitu', 'p_cml_water', 'p_hours', 'p_gas', 'p_gas_fluid_ratio', 'p_gas_oil_ratio', 'p_oil', 'p_oil_cut', 'p_water', 'p_water_cut', 'p_water_gas_ratio', 'p_water_oil_ratio', 'p_total_fluid']
  }).then(productionData => {
    productionData = JSON.stringify(productionData)
    productionData = JSON.parse(productionData)
    responseData.label = _.map(productionData, (o) => {
      return o.year + '-' + o.month
    })
    responseData.cumulativeGas = _.map(productionData, (o) => {
      return o.p_cml_gas
    })
    responseData.cumulativeHours = _.map(productionData, (o) => {
      return o.p_cml_hours
    })
    responseData.cumulativeOilBitumen = _.map(productionData, (o) => {
      return o.p_cml_oil_bitu
    })
    responseData.cumulativeWater = _.map(productionData, (o) => {
      return o.p_cml_water
    })
    responseData.gas = _.map(productionData, (o) => {
      return o.p_gas
    })
    responseData.gasFluidRatio = _.map(productionData, (o) => {
      return o.p_gas_fluid_ratio
    })
    responseData.gasOilRatio = _.map(productionData, (o) => {
      return o.p_gas_oil_ratio
    })
    responseData.hours = _.map(productionData, (o) => {
      return o.p_hours
    })
    responseData.oil = _.map(productionData, (o) => {
      return o.p_oil
    })
    responseData.oilCut = _.map(productionData, (o) => {
      return o.p_oil_cut
    })
    responseData.totalFluid = _.map(productionData, (o) => {
      return o.p_total_fluid
    })
    responseData.water = _.map(productionData, (o) => {
      return o.p_water
    })
    responseData.waterCut = _.map(productionData, (o) => {
      return o.p_water_cut
    })
    responseData.waterGasRatio = _.map(productionData, (o) => {
      return o.p_water_gas_ratio
    })
    responseData.waterOilRatio = _.map(productionData, (o) => {
      return o.p_water_oil_ratio
    })
  })
}

async function getSORData(w_id) {
  await db.Injection.findAll({
    where: {
      w_id: w_id,
      i_prod_type: 'I-STEAM'
    },
    attributes: [['w_id', 'w_id'], ['i_month', 'month'], ['i_year', 'year'], ['i_value', 'value']]
  }).then(injectionData => {
    injectionData = _.sortBy(injectionData, ['year', 'month'])
    injectionData = JSON.stringify(injectionData)
    injectionData = JSON.parse(injectionData)
    responseData.labelStream = _.map(injectionData, (o) => {
      return o.year + '-' + o.month
    })
    responseData.stream = _.map(injectionData, (o) => {
      return o.value
    })
  })

  await db.Production.findAll({
    where: {
      w_id: w_id
    },
    attributes: [['w_id', 'w_id'], ['p_month', 'month'], ['p_year', 'year'], 'p_oil']
  }).then(productionData => {
    productionData = _.sortBy(productionData, ['year', 'month'])
    productionData = JSON.stringify(productionData)
    productionData = JSON.parse(productionData)
    responseData.labelOil = _.map(productionData, (o) => {
      return o.year + '-' + o.month
    })
    responseData.oil = _.map(productionData, (o) => {
      return o.p_oil
    })
  })
}

module.exports = {
  async getTimeSeries(ctx) {
    responseData = {}
    var uwi = ctx.query.uwi
    var type = ctx.query.type

    var w_id
    await db.Wells.findAll({
      where: {
        w_uwi: uwi
      },
      attributes: ['w_id']
    }).then(wells => {
      wells = JSON.stringify(wells)
      wells = JSON.parse(wells)
      w_id = wells[0].w_id
    })

    switch (type) {
      case 'Injection':
        await getInjectionData(w_id)
        break
      case 'Production':
        await getProductionData(w_id)
        break
      case 'SOR':
        await getSORData(w_id)
        break
    }
    ctx.response.body = responseData
  }
}
