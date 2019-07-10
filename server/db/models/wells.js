module.exports = function(sequelize, DataTypes) {
  const Wells = sequelize.define('wells', {
    w_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    w_uwi: {
      type: DataTypes.STRING
    },
    w_name: {
      type: DataTypes.STRING
    },
    w_drillers_total_depth: {
      type: DataTypes.DOUBLE
    },
    w_operator: {
      type: DataTypes.STRING
    },
    w_current_status: {
      type: DataTypes.STRING
    },
    w_province: {
      type: DataTypes.STRING
    },
    w_class: {
      type: DataTypes.STRING
    },
    w_bottom_lng: {
      type: DataTypes.DOUBLE
    },
    w_bottom_lat: {
      type: DataTypes.DOUBLE
    },
    w_top_lng: {
      type: DataTypes.DOUBLE
    },
    w_top_lat: {
      type: DataTypes.DOUBLE
    },
    w_pad: {
      type: DataTypes.STRING
    },
    w_number_in_pad: {
      type: DataTypes.STRING
    },
    w_type: {
      type: DataTypes.STRING
    },
    w_injection_months: {
      type: DataTypes.INTEGER
    },
    w_producion_months: {
      type: DataTypes.INTEGER
    }
  }, {
    freezeTableName: true
  })

  Wells.removeAttribute('id')

    return Wells
}
