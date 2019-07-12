var db = require('../db')
var _ = require('lodash')

module.exports = {
  async getTableData(ctx) {
    var data
    await db.Wells.findAll({
      attributes: [['w_uwi', 'UWI'], ['w_name', 'Well Name'], ['w_operator', 'Well Operator'], ['w_current_status', 'Well Status'], ['w_province', 'Province'], ['w_class', 'Class'], ['w_drillers_total_depth', 'Drillers Total Depth'], ['w_type', 'Well Type'], ['w_pad', 'Pad'], ['w_top_lng', 'Top Longitude'], ['w_top_lat', 'Top Latitude'], ['w_bottom_lng', 'Bottom Longitude'], ['w_bottom_lat', 'Bottom Latitude']]
    }).then(well => {
      well = JSON.stringify(well)
      well = JSON.parse(well)
      data = well
    })
    ctx.response.body = data
  }
}
