<template>
  <div class="page-container">

    <div class="close-bar">
      <span class="sub-title">Neural Network</span>
      <img class="collapse-icon" src="@/icons/collapse.png" alt="collapse" @click="closeTab">
    </div>

    <div class="main-content">

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

      <div class="title-lable">Test Size</div>
      <div class="input-row" style="position:relative; left:30px;">
        <el-slider
          v-model="textSize"
          :step="5"
          style="width:280px;"
          show-stops
        />
      </div>

      <el-container style="margin: 5px 30px;">
        <el-main>
          <div style="text-align:left;margin-bottom:5px;">Number of neurons</div>
          <el-input v-model="neuronsNum" placeholder="Number of neurons" style="margin-bottom:8px;width:210px;" />
          <div style="text-align:left;margin-bottom:5px;">Activation Function</div>
          <el-select v-model="activationFunction" placeholder="Select a activation function" style="margin-bottom:8px;width:210px;">
            <el-option
              v-for="item in activationFuncOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-main>
        <el-aside width="55px" style="position:relative;">
          <el-button class="add-button" type="primary" icon="el-icon-plus" circle plain @click="addLayer" />
        </el-aside>
      </el-container>

      <el-container style="margin-top:15px;">
        <el-header style="padding:0">
          <b>Neural network layout</b>
        </el-header>
        <el-main style="height:160px;">
          <el-table
            :data="networkLayout"
            height="160"
            style="width: 100%"
          >
            <el-table-column
              label="Layer"
              type="index"
              width="58"
            />
            <el-table-column
              prop="neurons"
              label="Neurons"
              width="78"
            />
            <el-table-column
              prop="activation"
              label="Activation"
            />
            <el-table-column
              label="#"
              width="100"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, networkLayout)">Delete</el-button>
                <!-- <el-button type="text" size="small">Delete</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
      <el-button style="width:150px;margin-top:20px;" type="primary" plain disabled>Train</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lossFunction: '',
      optimizer: '',
      learningRate: '',
      epochsNum: '',
      batchSize: '',
      textSize: 20,
      neuronsNum: '',
      activationFunction: '',
      lossFuncOptions: [
        {
          value: 'Mean Squared Error',
          label: 'Mean Squared Error'
        },
        {
          value: 'Mean Absolute Error',
          label: 'Mean Absolute Error'
        },
        {
          value: 'Mean Absolute% Error',
          label: 'Mean Absolute% Error'
        },
        {
          value: 'Mean Squared Log Error',
          label: 'Mean Squared Log Error'
        },
        {
          value: 'Squared Hinge',
          label: 'Squared Hinge'
        },
        {
          value: 'Hinge',
          label: 'Hinge'
        },
        {
          value: 'Huperbolic Cosine Log Error',
          label: ''
        }
      ],
      optimizerOptions: [
        {
          value: 'Stochastic Gradient Descent',
          label: 'Stochastic Gradient Descent'
        },
        {
          value: 'RMSProp',
          label: 'RMSProp'
        },
        {
          value: 'Adagrad',
          label: 'Adagrad'
        },
        {
          value: 'Adadelta',
          label: 'Adadelta'
        },
        {
          value: 'Adam',
          label: 'Adam'
        },
        {
          value: 'Adamax',
          label: 'Adamax'
        },
        {
          value: 'Nesterov Adam',
          label: 'Nesterov Adam'
        }
      ],
      activationFuncOptions: [
        {
          value: 'Softmax',
          label: 'Softmax'
        },
        {
          value: 'Exponential Linear Unit',
          label: 'Exponential Linear Unit'
        },
        {
          value: 'Scaled Exponential Linear Unit',
          label: 'Scaled Exponential Linear Unit'
        },
        {
          value: 'Softplus',
          label: 'Softplus'
        },
        {
          value: 'Softsign',
          label: 'Softsign'
        },
        {
          value: 'Rectified Linear Unit',
          label: 'Rectified Linear Unit'
        },
        {
          value: 'Hyperbolic Tangent',
          label: 'Hyperbolic Tangent'
        },
        {
          value: 'Sigmoid',
          label: 'Sigmoid'
        },
        {
          value: 'Hard Sigmoid',
          label: 'Hard Sigmoid'
        },
        {
          value: 'Linear',
          label: 'Linear'
        }
      ],
      networkLayout: []
    }
  },
  methods: {
    closeTab: function() {
      this.$router.replace({ path: '/home' })
    },
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    addLayer() {
      this.networkLayout = this.networkLayout.concat(
        {
          neurons: this.neuronsNum,
          activation: this.activationFunction
        }
      )
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
  width: 340px;
  text-align: center;
  margin-top: 15px;
  max-height: calc(100vh - 65px);
  overflow-y:visible;
  overflow-x: hidden;
}

.input-label{
  display:inline-block;
  width:135px;
  text-align: left
}

.input-row{
  margin:3px 0 8px;
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
.el-header{
  padding: 0;
  height: 25px!important;
}
</style>
