var db = require('../db')
var _ = require('lodash');

module.exports = {
    async getWellsTopPoint(ctx) {
        let data;
        await db.Wells.findAll({
            attributes: [['w_top_lng','lng'], ['w_top_lat','lat'], ['w_uwi','uwi'], ['w_operator','operator'], ['w_current_status','status'], ['w_type','type']]
          }).then(well => {
            data = JSON.stringify(well);
        })
        ctx.response.body = data;
    },

    async getWellsBottomPoint(ctx) {
        let data;
        await db.Wells.findAll({
            attributes: [['w_bottom_lng','lng'], ['w_bottom_lat','lat'], ['w_uwi','uwi'], ['w_operator','operator'], ['w_current_status','status'], ['w_type','type']]
          }).then(well => {
            data = JSON.stringify(well);
        })
        ctx.response.body = data;
    },

    async getWellsPath(ctx) {
        let topPoint;
        let bottomPoint;
  
        await db.Wells.findAll({
            attributes: [['w_top_lng','lng'], ['w_top_lat','lat']]
          }).then(well => {
            topPoint = JSON.stringify(well)
            topPoint = JSON.parse(topPoint)

        })
        
        await db.Wells.findAll({
            attributes: [['w_bottom_lng','lng'], ['w_bottom_lat','lat']]
          }).then(well => {
            bottomPoint = JSON.stringify(well)
            bottomPoint = JSON.parse(bottomPoint)

        })

        var data = []
        for (var i=0; i < topPoint.length; i++){
            data = data.concat(topPoint[i])
            data = data.concat(bottomPoint[i])
        } 
        data = _.chunk(data, 2)
        ctx.response.body = data;
    },
}