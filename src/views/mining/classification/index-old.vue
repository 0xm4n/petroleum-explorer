
<template>
  <div class="home-container">
    <el-tabs tab-position="left">
      <el-tab-pane label="Categorical">
        <div class="select-box">
          <el-select
            v-model="value"
            placeholder="Select"
            size="medium"
            style="width: 400px;"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="search-button">
          <el-button type="primary" size="medium" plain style="width:200px;">Search</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Numerical">
        <div class="select-box">
          <el-select
            v-model="value1"
            placeholder="Select classification type"
            size="medium"
            style="width: 400px;"
          >
            <el-option
              v-for="item in optionsNumerical"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <el-row>
          <el-col :span="12">
            <el-radio v-model="radio" label="1" style>Equal Interval</el-radio>
          </el-col>
          <el-col :span="12">
            <span>Classes</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-radio v-model="radio" label="2" style>Quantile</el-radio>
          </el-col>
          <el-col :span="12">
            <el-select v-model="value" placeholder="Select Class">
              <el-option
                v-for="item in classOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-button type="primary" size="medium" plain style="width:400px; margin-top:15px;">Search</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      options: [{
        value: 'selection1',
        label: 'Well Class'
      }, {
        value: 'selection2',
        label: 'Well Current Status'
      }, {
        value: 'selection3',
        label: 'Well Type'
      }, {
        value: 'selection4',
        label: 'Pad'
      }],
      value: '',
      optionsNumerical: [{
        value: 'selection1',
        label: 'Well Class'
      }, {
        value: 'selection2',
        label: 'Well Current Status'
      }, {
        value: 'selection3',
        label: 'Well Type'
      }, {
        value: 'selection4',
        label: 'Pad'
      }],
      value1: '',
      radio: '1',
      classOptions: [
        {
          value: 'selection1',
          label: '1'
        },
        {
          value: 'selection2',
          label: '2'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.home {
    &-container {
        width: 100%;
    }
    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}

.search-button {
    text-align: center;
    margin-top: 30px;
}

.select-box {
    text-align: center;
    margin-top: 30px;
}

.el-row {
    width: 400px;
    margin-right: auto;
    margin-left: auto;
    line-height: 40px;
}
</style>
