module.exports = function(sequelize, DataTypes) {
  const Production = sequelize.define('production', {
    p_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    w_id: {
      type: DataTypes.INTEGER
    },
    p_cml_hours: {
      type: DataTypes.INTEGER
    },
    p_cml_gas: {
      type: DataTypes.DOUBLE
    },
    p_cml_oil_bitu: {
      type: DataTypes.DOUBLE
    },
    p_cml_water: {
      type: DataTypes.DOUBLE
    },
    p_hours: {
      type: DataTypes.INTEGER
    },
    p_gas: {
      type: DataTypes.DOUBLE
    },
    p_gas_act_day: {
      type: DataTypes.DOUBLE
    },
    p_gas_cal_day: {
      type: DataTypes.DOUBLE
    },
    p_gas_fluid_ratio: {
      type: DataTypes.DOUBLE
    },
    p_gas_oil_ratio: {
      type: DataTypes.DOUBLE
    },
    p_oil: {
      type: DataTypes.DOUBLE
    },
    p_oil_act_day: {
      type: DataTypes.DOUBLE
    },
    p_oil_cal_day: {
      type: DataTypes.DOUBLE
    },
    p_oil_cut: {
      type: DataTypes.DOUBLE
    },
    p_water: {
      type: DataTypes.DOUBLE
    },
    p_water_act_day: {
      type: DataTypes.DOUBLE
    },
    p_water_cal_day: {
      type: DataTypes.DOUBLE
    },
    p_water_cut: {
      type: DataTypes.DOUBLE
    },
    p_water_gas_ratio: {
      type: DataTypes.DOUBLE
    },
    p_water_oil_ratio: {
      type: DataTypes.DOUBLE
    },
    p_total_fluid: {
      type: DataTypes.DOUBLE
    },
    p_total_fluid_act_day: {
      type: DataTypes.DOUBLE
    },
    p_total_fluid_cal_day: {
      type: DataTypes.DOUBLE
    },
    p_month: {
      type: DataTypes.INTEGER
    },
    p_year: {
      type: DataTypes.INTEGER
    }
  }, {
    freezeTableName: true
  })

  Production.removeAttribute('id')

  return Production
}

