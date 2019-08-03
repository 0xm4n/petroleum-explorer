module.exports = function(sequelize, DataTypes) {
  const Suncor_full = sequelize.define('suncor_full', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    Date: {
      type: DataTypes.STRING
    },
    '101STM': {
      type: DataTypes.DOUBLE
    },
    '102STM': {
      type: DataTypes.DOUBLE
    },
    '103STM': {
      type: DataTypes.DOUBLE
    },
    '104STM': {
      type: DataTypes.DOUBLE
    },
    '105STM': {
      type: DataTypes.DOUBLE
    },
    '106STM': {
      type: DataTypes.DOUBLE
    },
    '107STM': {
      type: DataTypes.DOUBLE
    },
    '108STM': {
      type: DataTypes.DOUBLE
    },
    '109STM': {
      type: DataTypes.DOUBLE
    },
    '110STM': {
      type: DataTypes.DOUBLE
    },
    '115STM': {
      type: DataTypes.DOUBLE
    },
    '116STM': {
      type: DataTypes.DOUBLE
    },
    '117STM': {
      type: DataTypes.DOUBLE
    },
    'WOR': {
      type: DataTypes.DOUBLE
    }
  }, {
    freezeTableName: true
  })

  Suncor_full.removeAttribute('id')

  return Suncor_full
}

