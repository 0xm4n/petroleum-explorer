module.exports = function(sequelize, DataTypes) {
  const Injection = sequelize.define('injection', {
    i_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    w_id: {
      type: DataTypes.INTEGER
    },
    i_month: {
      type: DataTypes.INTEGER
    },
    i_year: {
      type: DataTypes.INTEGER
    },
    i_prod_type: {
      type: DataTypes.STRING
    },
    i_value: {
      type: DataTypes.DOUBLE
    }
  }, {
    freezeTableName: true
  })

  Injection.removeAttribute('id')

  return Injection
}

