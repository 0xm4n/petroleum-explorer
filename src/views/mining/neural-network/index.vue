<template>
  <div class="page-container">
    <div class="close-bar">
      <span class="sub-title">Neural Network</span>
      <img class="collapse-icon" src="@/icons/collapse.png" alt="collapse" @click="closeTab">
    </div>

    <div class="main-content">
      <el-collapse v-model="activeCollapse" accordion>
        <!-- ANN -->
        <el-collapse-item name="1">
          <template slot="title">
            <span class="item-title">ANN</span>
          </template>

          <div class="input-row">
            <div class="input-label">Loss Function</div>
            <div style="display: inline-block;">
              <el-select v-model="lossFunction" placeholder="Select" style="width:140px;">
                <el-option
                  v-for="item in lossFuncOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>

          <div class="input-row">
            <div class="input-label">Optimizer</div>
            <div style="display: inline-block;">
              <el-select v-model="optimizer" placeholder="Select" style="width:140px;">
                <el-option
                  v-for="item in optimizerOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>

          <div class="input-row">
            <div class="input-label">Learning Rate</div>
            <div style="display: inline-block;">
              <el-input v-model="learningRate" placeholder="Learning Rate" style="width:140px;" />
            </div>
          </div>

          <div class="input-row">
            <div class="input-label">Epochs Number</div>
            <div style="display: inline-block;">
              <el-input v-model="epochsNum" placeholder="Epochs Number" style="width:140px;" />
            </div>
          </div>

          <div class="input-row">
            <div class="input-label">Batch Size</div>
            <div style="display: inline-block;">
              <el-input v-model="batchSize" placeholder="Batch Size" style="width:140px;" />
            </div>
          </div>

          <div class="title-lable">Test Size(%)</div>
          <div class="input-row" style="position:relative; left:30px;">
            <el-slider v-model="testSize" :step="5" style="width:280px;" show-stops />
          </div>

          <el-container style="margin: 5px 30px;">
            <el-main>
              <div style="text-align:left;margin-bottom:5px;">Number of neurons</div>
              <el-input
                v-model="neuronsNum"
                placeholder="Number of neurons"
                style="margin-bottom:8px;width:200px;"
              />
              <div style="text-align:left;margin-bottom:5px;">Activation Function</div>
              <el-select
                v-model="activationFunction"
                placeholder="Select a activation function"
                style="margin-bottom:8px;width:200px;"
              >
                <el-option
                  v-for="item in activationFuncOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-main>
            <el-aside width="55px" style="position:relative;">
              <el-button
                class="add-button"
                type="primary"
                icon="el-icon-plus"
                circle
                plain
                @click="addLayer"
              />
            </el-aside>
          </el-container>

          <el-container style="margin-top:15px;">
            <el-header style="padding:0">
              <b>Neural network layout</b>
            </el-header>
            <el-main style="height:160px;">
              <el-table :data="networkLayout" height="160" style="width: 100%">
                <el-table-column label="Layer" type="index" width="58" />
                <el-table-column prop="neurons" label="Neurons" width="78" />
                <el-table-column prop="activation" label="Activation" />
                <el-table-column label="#" width="80">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="small"
                      @click.native.prevent="deleteRow(scope.$index, networkLayout)"
                    >Delete</el-button>
                    <!-- <el-button type="text" size="small">Delete</el-button> -->
                  </template>
                </el-table-column>
              </el-table>
            </el-main>
          </el-container>
          <el-button style="width:150px;margin-top:20px;" type="primary" plain @click="clickANN">Run</el-button>
        </el-collapse-item>

        <el-collapse-item name="2">
          <template slot="title">
            <span class="item-title">LSTM</span>
          </template>

          <div class="input-row">
            <div class="input-label">Loss Function</div>
            <div style="display: inline-block;">
              <el-select v-model="lossFunction" placeholder="Select" style="width:140px;">
                <el-option
                  v-for="item in lossFuncOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>

          <div class="input-row">
            <div class="input-label">Optimizer</div>
            <div style="display: inline-block;">
              <el-select v-model="optimizer" placeholder="Select" style="width:140px;">
                <el-option
                  v-for="item in optimizerOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>

          <div class="input-row">
            <div class="input-label">Learning Rate</div>
            <div style="display: inline-block;">
              <el-input v-model="learningRate" placeholder="Learning Rate" style="width:140px;" />
            </div>
          </div>

          <div class="input-row">
            <div class="input-label">Epochs Number</div>
            <div style="display: inline-block;">
              <el-input v-model="epochsNum" placeholder="Epochs Number" style="width:140px;" />
            </div>
          </div>

          <div class="input-row">
            <div class="input-label">Batch Size</div>
            <div style="display: inline-block;">
              <el-input v-model="batchSize" placeholder="Batch Size" style="width:140px;" />
            </div>
          </div>

          <div class="title-lable">Test Size(%)</div>
          <div class="input-row" style="position:relative; left:30px;">
            <el-slider v-model="testSize" :step="5" style="width:280px;" show-stops />
          </div>

          <el-container style="margin: 5px 30px;">
            <el-main>
              <div style="text-align:left;margin-bottom:5px;">Number of neurons</div>
              <el-input
                v-model="neuronsNum"
                placeholder="Number of neurons"
                style="margin-bottom:8px;width:200px;"
              />
              <div style="text-align:left;margin-bottom:5px;">Activation Function</div>
              <el-select
                v-model="activationFunction"
                placeholder="Select a activation function"
                style="margin-bottom:8px;width:200px;"
              >
                <el-option
                  v-for="item in activationFuncOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-main>
            <el-aside width="55px" style="position:relative;">
              <el-button
                class="add-button"
                type="primary"
                icon="el-icon-plus"
                circle
                plain
                @click="addLayer"
              />
            </el-aside>
          </el-container>

          <el-container style="margin-top:15px;">
            <el-header style="padding:0">
              <b>Neural network layout</b>
            </el-header>
            <el-main style="height:160px;">
              <el-table :data="networkLayout" height="160" style="width: 100%">
                <el-table-column label="Layer" type="index" width="58" />
                <el-table-column prop="neurons" label="Neurons" width="78" />
                <el-table-column prop="activation" label="Activation" />
                <el-table-column label="#" width="80">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="small"
                      @click.native.prevent="deleteRow(scope.$index, networkLayout)"
                    >Delete</el-button>
                    <!-- <el-button type="text" size="small">Delete</el-button> -->
                  </template>
                </el-table-column>
              </el-table>
            </el-main>
          </el-container>
          <el-button
            style="width:150px;margin-top:20px;"
            type="primary"
            plain
            @click="clickLSTM"
          >Run</el-button>
        </el-collapse-item>
      </el-collapse>

      <el-dialog
        title="Prediction"
        :visible.sync="neuralNetworkDialogVisible"
        width="50%"
        :before-close="closeDialog"
        :modal-append-to-body="false"
        top="2vh"
      >
        <!-- <el-input v-model="" :disabled="true"></el-input> -->
        <span class="pcc-label"> pcc:{{ neuralNetworkData.pcc }} </span>
        <span class="rmse-label"> rmse:{{ neuralNetworkData.rmse }} </span>
        <v-chart v-loading="loading" :options="neuralNetworkOption" style="width:100%;" />

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="closeDialog">Close</el-button>
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
      neuralNetworkDialogVisible: false,
      activeCollapse: '',
      lossFunction: 'mean_squared_error',
      optimizer: 'sgd',
      learningRate: '0.1',
      epochsNum: '40',
      batchSize: '20',
      testSize: 20,
      neuronsNum: '',
      activationFunction: '',
      neuralNetworkOption: {},
      neuralNetworkData: {
        label: [],
        real: [],
        test: [],
        rmse: '',
        pcc: ''
      },
      lossFuncOptions: [
        {
          value: 'mean_squared_error',
          label: 'Mean Squared Error'
        },
        {
          value: 'mean_absolute_error',
          label: 'Mean Absolute Error'
        },
        {
          value: 'mean_absolute_percentage_error',
          label: 'Mean Absolute Percentage Error'
        },
        {
          value: 'mean_squared_logarithmic_error',
          label: 'Mean Squared Log Error'
        },
        {
          value: 'squared_hinge',
          label: 'Squared Hinge'
        },
        {
          value: 'hinge',
          label: 'Hinge'
        },
        {
          value: 'cosine_proximity',
          label: 'Cosine_Proximity'
        }
      ],
      optimizerOptions: [
        {
          value: 'sgd',
          label: 'Stochastic Gradient Descent'
        },
        {
          value: 'rmsprop',
          label: 'RMSProp'
        },
        {
          value: 'adagrad',
          label: 'Adagrad'
        },
        {
          value: 'adadelta',
          label: 'Adadelta'
        },
        {
          value: 'adam',
          label: 'Adam'
        },
        {
          value: 'adamax',
          label: 'Adamax'
        },
        {
          value: 'nadam',
          label: 'Nesterov Adam'
        }
      ],
      activationFuncOptions: [
        {
          value: 'softmax',
          label: 'Softmax'
        },
        {
          value: 'elu',
          label: 'Exponential Linear Unit'
        },
        {
          value: 'selu',
          label: 'Scaled Exponential Linear Unit'
        },
        {
          value: 'softplus',
          label: 'Softplus'
        },
        {
          value: 'softsign',
          label: 'Softsign'
        },
        {
          value: 'relu',
          label: 'Rectified Linear Unit'
        },
        {
          value: 'tanh',
          label: 'Hyperbolic Tangent'
        },
        {
          value: 'sigmoid',
          label: 'Sigmoid'
        },
        {
          value: 'hard_sigmoid',
          label: 'Hard Sigmoid'
        },
        {
          value: 'linear',
          label: 'Linear'
        }
      ],
      networkLayout: [],
      loading: true
    }
  },
  computed: {
    series() {
      var arr = []
      var dataType = 'real'
      var neuralNetworkData = this.neuralNetworkData
      var temp = {
        name: 'real',
        type: 'line',
        data: neuralNetworkData[dataType]
      }
      arr[0] = temp

      var dataType = 'test'
      var neuralNetworkData = this.neuralNetworkData
      var temp = {
        name: 'test',
        type: 'line',
        data: neuralNetworkData[dataType]
      }
      arr[1] = temp

      return arr
    },
    Network() {
      var str = ''
      for (let i = 0; i < this.networkLayout.length; i++) {
        var layer = this.networkLayout[i]
        str = str + layer.neurons + ' '
        str = str + layer.activation + '  '
      }

      return str
    }
  },
  methods: {
    closeTab: function() {
      this.$router.replace({ path: '/home' })
    },
    closeDialog: function() {
      this.neuralNetworkDialogVisible = false
      this.neuralNetworkOption = {}
      this.neuralNetworkData = {
        label: [],
        real: [],
        test: [],
        rmse: '',
        pcc: ''
      }
      this.loading = true
    },
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },

    clickANN: function() {
      const self = this
      self.neuralNetworkDialogVisible = true
      http
        .get('/runANN', {
          params: {
            lossFunction: self.lossFunction,
            optimizer: self.optimizer,
            learningRate: self.learningRate,
            epochsNum: self.epochsNum,
            batchSize: self.batchSize,
            testSize: self.testSize,
            network: self.Network
          }
        })
        .then(function(response) {
          self.neuralNetworkData = response.data
          self.neuralNetworkOption = {
            title: {
              text: 'ANN'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['real', 'test'],
              orient: 'vertical',
              right: 'right',
              top: 50
            },
            grid: {
              left: '3%',
              right: '13%',
              bottom: '12%',
              containLabel: true
            },
            dataZoom: [
              {
                type: 'inside'
              },
              {
                type: 'slider'
              }
            ],
            toolbox: {
              right: '6%',
              feature: {
                saveAsImage: {
                  title: 'Save'
                }
              }
            },
            xAxis: {
              type: 'category',
              data: self.neuralNetworkData.label
            },
            yAxis: {
              type: 'value',
              scale: true
            },
            series: self.series
          }
          self.loading = false
        })
    },

    clickLSTM: function() {
      const self = this
      self.neuralNetworkDialogVisible = true
      http
        .get('/runLSTM', {
          params: {
            lossFunction: self.lossFunction,
            optimizer: self.optimizer,
            learningRate: self.learningRate,
            epochsNum: self.epochsNum,
            batchSize: self.batchSize,
            testSize: self.testSize,
            network: self.Network
          }
        })
        .then(function(response) {
          self.neuralNetworkData = response.data
          self.neuralNetworkOption = {
            title: {
              text: 'LSTM'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['real', 'test'],
              orient: 'vertical',
              right: 'right',
              top: 50
            },
            grid: {
              left: '3%',
              right: '13%',
              bottom: '12%',
              containLabel: true
            },
            dataZoom: [
              {
                type: 'inside'
              },
              {
                type: 'slider'
              }
            ],
            toolbox: {
              right: '6%',
              feature: {
                saveAsImage: {
                  title: 'Save'
                }
              }
            },
            xAxis: {
              type: 'category',
              data: self.neuralNetworkData.label
            },
            yAxis: {
              type: 'value',
              scale: true
            },
            series: self.series
          }
          self.loading = false
        })
    },
    addLayer() {
      this.networkLayout = this.networkLayout.concat({
        neurons: this.neuronsNum,
        activation: this.activationFunction
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

.close-bar {
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

.main-content {
  width: 340px;
  text-align: center;
  max-height: calc(100vh - 65px);
  overflow-y: visible;
  overflow-x: hidden;
}

.input-label {
  display: inline-block;
  width: 135px;
  text-align: left;
}

.input-row {
  margin: 3px 0 8px;
}

.el-main {
  padding: 0;
}
.el-aside {
  padding: 0;
}
.add-button {
  position: absolute;
  top: 50%;
  transform: translate(-35%, -50%);
}
.el-header {
  padding: 0;
  height: 25px !important;
}
.pcc-label{
  position:absolute;
  bottom: 195px;
  right: 18px;
}
.rmse-label{
  position:absolute;
  bottom: 175px;
  right: 18px;
}

.item-title {
    margin-left: 15px;
    font-size: 16px;
}
</style>
