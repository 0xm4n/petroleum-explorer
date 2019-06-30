<template>
  <div class="home-container">
    <el-row>
      <el-col :span="8">
        <span>Loss function:</span>
        <el-select v-model="value1" placeholder="" style="width: 250px;">
          <el-option
            v-for="item in lossFuncOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="8">
        <span style="margin-left:40px;">Optimizer:</span>
        <el-select v-model="value2" placeholder="" style="width: 250px;">
          <el-option
            v-for="item in optimizerOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>

    </el-row>
    <el-row>
      <el-col :span="8">
        <span>Learning rate:</span>
        <el-input v-model="learningRate" placeholder="Please input the learning rate" style="width: 250px;" />
      </el-col>
      <el-col :span="8">
        <span>Num of epochs:</span>
        <el-input v-model="epochNum" placeholder="Please input the number of epochs" style="width: 250px;" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <span style="margin-left:20px;"> Batch size : </span>
        <el-input v-model="batchSize" placeholder="Please input the batch size" style="width: 250px;" />
      </el-col>
      <el-col :span="8">
        <span>Num of neurons: </span>
        <el-input v-model="neuronNum" placeholder="Please input the num of neurons" style="width: 250px;" />
      </el-col>
    </el-row>
    <el-row>

      <el-col :span="8">
        <span style="margin-left:15px;margin-right:10px;position:relative;bottom:15px;"> Test size(%): </span>
        <el-slider
          v-model="value3"
          :step="5"
        />
      </el-col>
      <el-col :span="8" style="position:relative;right:10px;">
        <span>Activation function:</span>
        <el-select v-model="value4" placeholder="" style="width: 250px;">
          <el-option
            v-for="item in activationFuncOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" plain style="width:200px;">Train</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      lossFuncOptions: [{
        value: '选项1',
        label: 'Mean Squared Error'
      }, {
        value: '选项2',
        label: 'Mean Absolute Error'
      }, {
        value: '选项3',
        label: 'Mean Absolute % Error'
      }, {
        value: '选项4',
        label: 'Mean Squared Log Error'
      }, {
        value: '选项5',
        label: 'Squared Hinge'
      }, {
        value: '选项6',
        label: 'Hinge'
      }, {
        value: '选项7',
        label: 'Hyperbolic Cosine Log Error'
      }],
      optimizerOptions: [{
        value: '选项1',
        label: 'Stochastic Gradient Descent'
      }, {
        value: '选项2',
        label: 'RMSProp'
      }, {
        value: '选项3',
        label: 'Adagrad'
      }, {
        value: '选项4',
        label: 'Adadelta'
      }, {
        value: '选项5',
        label: 'Adam'
      }, {
        value: '选项6',
        label: 'Adamax'
      }, {
        value: '选项7',
        label: 'Nesterov Adam'
      }],
      activationFuncOptions: [{
        value: '选项1',
        label: 'Softmax'
      }, {
        value: '选项2',
        label: 'Exponential Linear Unit'
      }, {
        value: '选项3',
        label: 'Scaled Exponential Linear Unit'
      }, {
        value: '选项4',
        label: 'Softplus'
      }, {
        value: '选项5',
        label: 'Softsign'
      }, {
        value: '选项6',
        label: 'Rectified Linear Unit'
      }, {
        value: '选项7',
        label: 'Hyperbolic Tangent'
      }, {
        value: '选项8',
        label: 'Sigmoid'
      }, {
        value: '选项9',
        label: 'Hard Sigmoid'
      }, {
        value: '选项10',
        label: 'Linear'
      }],
      value1: '',
      value2: '',
      value3: null,
      value4: '',
      learningRate: '',
      epochNum: '',
      batchSize: '',
      neuronNum: ''
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.home {
  &-container {
    width: 100%;
    text-align: center;
    margin: 20px;
  }
  &-text {
    font-size: 50px;
    line-height: 66px;
  }
}
.el-row {
    margin-top: 7px;
    margin-bottom: 7px;
}
label {

}
.el-slider{
    display: inline-block!important;
    width: 240px;
}
</style>
