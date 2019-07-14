<template>
  <div class="page-container">

    <div class="close-bar">
      <span class="sub-title">Data Visualization</span>
      <img class="collapse-icon" src="@/icons/collapse.png" alt="collapse" @click="closeTab">
    </div>

    <div class="main-content">
      <el-collapse v-model="activeCollapse" accordion>

        <!-- Bar Chart -->
        <el-collapse-item name="1">
          <template slot="title">
            <span class="item-title">Bar Chart</span>
          </template>
          <div class="expansion-content">
            <el-select v-model="barChartType" placeholder="Select a chart" style="width:250px;">
              <el-option
                v-for="item in barChartOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <el-button
            type="primary"
            plain
            style="width:200px;margin-top:15px;"
            @click="showBarChart()"
          >Apply</el-button>
        </el-collapse-item>

        <!-- Pie Chart -->
        <el-collapse-item name="2">
          <template slot="title">
            <span class="item-title">Pie Chart</span>
          </template>
          <div class="expansion-content">
            <el-select v-model="pieChartType" placeholder="Select a chart" style="width:250px;">
              <el-option
                v-for="item in pieChartOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <el-button
            type="primary"
            plain
            style="width:200px;margin-top:15px;"
            @click="showPieChart()"
          >Apply</el-button>
        </el-collapse-item>

        <!-- Time Series -->
        <el-collapse-item name="3">
          <template slot="title">
            <span class="item-title">Time Series</span>
          </template>
          <div class="expansion-content" style>
            <span style="font-size:15px;">Unique Well Identifier</span>

            <el-input v-model="uwi" placeholder="UWI" style="margin:10px 0;width:250px;" />

            <el-select v-model="timeSeriesType" placeholder="choose data type" style="width:250px;margin:10px 0;">
              <el-option
                v-for="item in timeSeriesTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <el-button
            type="primary"
            plain
            style="width:200px;"
            @click="showTimeSeriesChart()"
          >Apply</el-button>
        </el-collapse-item>
      </el-collapse>

      <!-- Bar Chart dialog -->
      <el-dialog
        title="Bar Chart"
        :visible.sync="barChartDialogVisible"
        width="630px"
        :modal-append-to-body="false"
        top="10vh"
      >
        <v-chart :options="barOption" />
        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="barChartDialogVisible = false">Cancel</el-button> -->
          <el-button type="primary" @click="barChartDialogVisible = false">Close</el-button>
        </span>
      </el-dialog>

      <!-- Pie Chart dialog -->
      <el-dialog
        title=""
        :visible.sync="pieChartDialogVisible"
        width="630px"
        :modal-append-to-body="false"
        top="10vh"
      >
        <v-chart :options="pieOption" />
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="pieChartDialogVisible = false">Close</el-button>
        </span>
      </el-dialog>

      <!-- Time Series dialog -->
      <el-dialog
        title=""
        :visible.sync="timeSeriesDialogVisible"
        width="60%"
        :modal-append-to-body="false"
        top="10vh"
      >
        <v-chart :options="timeSeriesOption" style="width:100%;" />
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="timeSeriesDialogVisible = false">Close</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import http from '@/utils/http'
var echarts = require('echarts')
export default {
  components: {
    'v-chart': ECharts
  },
  data() {
    return {
      activeCollapse: '1',
      barChartType: '',
      pieChartType: '',
      timeSeriesType: '',
      barChartOptions: [
        {
          value: 'Average Injection Hours',
          label: 'Average Injection Hours'
        },
        {
          value: 'Average Oil Production',
          label: 'Average Oil Production'
        },
        {
          value: 'Average SOR',
          label: 'Average SOR'
        },
        {
          value: 'Average Steam Injection',
          label: 'Average Steam Injection'
        },
        {
          value: 'Well Drillers Total Depth',
          label: 'Well Drillers Total Depth'
        }
      ],
      pieChartOptions: [
        {
          value: 'Well Class',
          label: 'Well Class'
        },
        {
          value: 'Well Current Status',
          label: 'Well Current Status'
        },
        {
          value: 'Well Operator',
          label: 'Well Operator'
        },
        {
          value: 'Well Province',
          label: 'Well Province'
        },
        {
          value: 'Well Type',
          label: 'Well Type'
        },
        {
          value: 'Pad',
          label: 'Pad'
        }
      ],
      timeSeriesTypeOptions: [
        {
          value: 'Injection',
          label: 'Injection'
        },
        {
          value: 'Production',
          label: 'Production'
        },
        {
          value: 'SOR',
          label: 'SOR'
        },
        {
          value: 'Well Status',
          label: 'Well Status'
        }
      ],
      barChartDialogVisible: false,
      pieChartDialogVisible: false,
      timeSeriesDialogVisible: false,
      barXvalue: [],
      barYvalue: [],
      pieData: {
        value: [],
        label: []
      },
      barOption: {},
      pieOption: {},
      timeSeriesOption: {},
      timeSeriesData: {
        label: []
      }

    }
  },
  computed: {
    uwi: {
      get() {
        return this.$store.state.map.uwi
      },
      set(value) {
        this.$store.dispatch('map/changeUWI', value)
      }
    },
    timeSeriesLegend() {
      var temp
      if (this.timeSeriesType === 'Injection') {
        temp = ['Hours', 'Steam']
      } else if (this.timeSeriesType === 'Production') {
        temp = ['Cumulative Gas', 'Cumulative Hours', 'Cumulative Oil Bitumen', 'Cumulative Water', 'Gas', 'Gas Fluid Ratio', 'Gas Oil Ratio', 'Hours', 'Oil', 'Oil Cut', 'Total Fluid', 'Water', 'Water Cut', 'Water Gas Ratio', 'Water Oil Ratio']
      } else if (this.timeSeriesType === 'Injection') {
        temp = ['Hours', 'Steam']
      }
      return temp
    },
    labelArr() {
      var temp
      if (this.timeSeriesType === 'Injection') {
        temp = ['hourData', 'streamData']
      } else if (this.timeSeriesType === 'Production') {
        temp = ['cumulativeGas', 'cumulativeHours', 'cumulativeOilBitumen', 'cumulativeWater', 'gas', 'gasFluidRatio', 'gasOilRatio', 'hours', 'oil', 'oilCut', 'totalFluid', 'water', 'waterCut', 'waterGasRatio', 'waterOilRatio']
      } else if (this.timeSeriesType === 'Injection') {
        temp = ['Hours', 'Steam']
      }
      return temp
    },
    series() {
      var arr = []
      for (let i = 0; i < this.labelArr.length; i++) {
        var dataType = this.labelArr[i]
        var timeSeriesData = this.timeSeriesData
        var temp = {
          name: this.timeSeriesLegend[i],
          type: 'line',
          data: timeSeriesData[dataType]
        }
        arr[i] = temp
      }
      return arr
    },
    isProductionTimeSeries() {
      if (this.timeSeriesType === 'Production') {
        return true
      } else return false
    }
  },
  methods: {
    closeTab: function() {
      this.$store.dispatch('map/changeUWI', '')
      this.$router.replace({ path: '/home' })
    },
    updateUWI: function(e) {
      this.$store.dispatch('map/changeUWI', e.target.value)
    },
    showBarChart: function() {
      var self = this
      http.get('/getBarChart',
        {
          params: {
            type: self.barChartType
          }
        })
        .then(function(response) {
          self.barXvalue = response.data.valueData
          self.barYvalue = response.data.categoryData
          self.barChartDialogVisible = true
          self.barOption = {
            title: {
              text: self.barChartType,
              left: 10
            },
            toolbox: {
              right: '6%',
              feature: {
                saveAsImage: {
                  pixelRatio: 2,
                  title: 'Save'
                }
              }
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              },
              formatter: function(params) {
                var res = '<b>' + self.barChartType + '</b>' +
                 '<div>' + params[0].value + '</div>' +
                 '<div style="text-align:left">UWI</div>' +
                 '<div style="text-align:left;margin-left:15px;">' + params[0].data.uwi + '</div>' +
                 '<div style="text-align:left">Well Operator</div>' +
                 '<div style="text-align:left;margin-left:15px;">' + params[0].data.operator + '</div>' +
                 '<div style="text-align:left">Well Status</div>' +
                 '<div style="text-align:left;margin-left:15px;">' + params[0].data.status
                return res
              }
            },
            grid: {
              bottom: 90
            },
            dataZoom: [{
              type: 'inside'
            }, {
              type: 'slider'
            }],
            xAxis: {
              name: 'wid',
              type: 'category',
              silent: false,
              splitLine: {
                show: false
              },
              splitArea: {
                show: false
              },
              data: self.barXvalue
            },
            yAxis: {
              type: 'value',
              splitArea: {
                show: false
              }
            },
            series: [{
              data: self.barYvalue,
              type: 'bar',
              large: true
            }]
          }
        })
    },
    showPieChart: function() {
      var self = this
      http.get('/getPieChart',
        {
          params: {
            type: self.pieChartType
          }
        }
      )
        .then(function(response) {
          self.pieData.value = response.data.value
          self.pieData.label = response.data.label
          self.pieChartDialogVisible = true
          self.pieOption = {
            title: {
              text: 'Pie Chart',
              subtext: self.pieChartType,
              x: 'center'
            },
            toolbox: {
              right: '6%',
              feature: {
                saveAsImage: {
                  pixelRatio: 2,
                  title: 'Save'
                }
              }
            },
            grid: {
              left: '90'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              left: 0,
              data: self.pieData.label
            },
            series: [
              {
                name: 'Well Class',
                type: 'pie',
                radius: '75%',
                center: ['50%', '60%'],
                data: self.pieData.value,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          }
        })
    },
    showTimeSeriesChart: function() {
      const self = this
      http.get('/getTimeSeries',
        {
          params: {
            uwi: self.uwi,
            type: self.timeSeriesType
          }
        }
      )
        .then(function(response) {
          self.timeSeriesData = response.data
          self.timeSeriesDialogVisible = true
          self.timeSeriesOption = {
            title: {
              text: 'Time Series',
              subtext: self.timeSeriesType
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: self.timeSeriesLegend,
              orient: 'vertical',
              right: 'right',
              top: 50
            },
            grid: {
              left: '3%',
              right: self.isProductionTimeSeries ? '25%' : '13%',
              bottom: '12%',
              containLabel: true
            },
            dataZoom: [{
              type: 'inside'
            }, {
              type: 'slider'
            }],
            toolbox: {
              right: self.isProductionTimeSeries ? '17%' : '6%',
              feature: {
                saveAsImage: {
                  title: 'Save'
                }
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: self.timeSeriesData.label
            },
            yAxis: {
              type: 'value'
            },
            series: self.series
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  &-container {
    width: 340px;
    position: absolute;
    top: 0;
    background-color: white;
    z-index: 1;
    height: 100vh;
    box-shadow: 3px 3px 3px #888888;
  }
  &-text {
    font-size: 50px;
    line-height: 66px;
  }
}

.close-bar{
  width: 100%;
  height: 50px;
  text-align: center;
  position: relative;
  border-bottom: 1px solid rgba(182, 182, 182, 0.838);
}
.sub-title {
line-height: 50px;
font-size: 20px;
}

.collapse-icon {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 35px;
  height: 35px;
}

.main-content{
  text-align: center;
}

.item-title {
    margin-left: 15px;
    font-size: 16px;
}

.expansion-content {
    height: 100%;
    width: 100%;
    text-align: center;
    // margin-top: 10px;
}

</style>
