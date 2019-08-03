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
db.Injection = db.import('./models/injection.js')
db.Production = db.import('./models/production.js')
db.Suncor_full = db.import('./models/suncor_full.js')

module.exports = db
