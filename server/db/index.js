const Sequelize = require('sequelize')
var config = require('./config.js')

var db = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  define: {
    timestamps: false
  }
})

db.Wells = db.import('./models/wells.js')
db.Statistics = db.import('./models/statistics.js')

module.exports = db
