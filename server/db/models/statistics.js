module.exports = function(sequelize, DataTypes) {
  const Statistics = sequelize.define('statistics', {
    st_id: {
      type: DataTypes.INTEGER
    },
    st_injector_w_id: {
      type: DataTypes.INTEGER
    },
    st_producer_w_id: {
      type: DataTypes.INTEGER
    },
    st_min_injection_hour: {
      type: DataTypes.DOUBLE
    },
    st_max_injection_hour: {
      type: DataTypes.DOUBLE
    },
    st_avg_injection_hour: {
      type: DataTypes.DOUBLE
    },
    st_stddev_injection_hour: {
      type: DataTypes.DOUBLE
    },
    st_min_injection_steam: {
      type: DataTypes.DOUBLE
    },
    st_max_injection_steam: {
      type: DataTypes.DOUBLE
    },
    st_avg_injection_steam: {
      type: DataTypes.DOUBLE
    },
    st_stddev_injection_steam: {
      type: DataTypes.DOUBLE
    },
    st_min_production_oil: {
      type: DataTypes.DOUBLE
    },
    st_max_production_oil: {
      type: DataTypes.DOUBLE
    },
    st_avg_production_oil: {
      type: DataTypes.DOUBLE
    },
    st_stddev_production_oil: {
      type: DataTypes.DOUBLE
    },
    st_min_sor: {
      type: DataTypes.DOUBLE
    },
    st_max_sor: {
      type: DataTypes.DOUBLE
    },
    st_avg_sor: {
      type: DataTypes.DOUBLE
    },
    st_stddev_sor: {
      type: DataTypes.DOUBLE
    }
  }, {
    freezeTableName: true
  })

  Statistics.removeAttribute('id')

  return Statistics
}
