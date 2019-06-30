const Sequelize = require('sequelize');
var config = require('./config.js')

var db = new Sequelize(config.database,config.username,config.password,{
    host: config.host,
    dialect: config.dialect,
    define: {
        timestamps: false
    }
});

// db.Trajectory = db.import('./models/trajectory.js')
// db.User = db.import('./models/user.js')

db.Wells = db.import('./models/wells.js')

module.exports = db;
