<template>
  <div class="page-container">

    <div class="close-bar">
      <span class="sub-title">Classification</span>
      <img class="collapse-icon" src="@/icons/collapse.png" alt="collapse" @click="closeTab">
    </div>

    <div class="main-content">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="Categorical" name="first">
          <div style="margin-top:15px;">
            <el-select
              v-model="value"
              placeholder="Select"
              size="medium"
              style="width: 250px;"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <div class="search-button">
              <el-button type="primary" size="medium" plain style="width:200px;">Apply</el-button>
            </div>
          </div>

        </el-tab-pane>

        <el-tab-pane label="Numerical" name="second">
          <div style="margin-top:15px;">
            <el-select
              v-model="value1"
              placeholder="Select classification type"
              size="medium"
              style="width: 250px;"
            >
              <el-option
                v-for="item in optionsNumerical"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
                <el-select v-model="value" placeholder="Select Class" style="width:140px;">
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
                <el-button type="primary" size="medium" plain style="width:200px; margin-top:15px;">Apply</el-button>
              </el-col>
            </el-row>
          </div>

        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first',
      value: '',
      value1: '',
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
  methods: {
    closeTab: function() {
      this.$router.replace({ path: '/home' })
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

.search-button {
    text-align: center;
    margin-top: 30px;
}

.el-row {
    width: 340px;
    margin-right: auto;
    margin-left: auto;
    line-height: 40px;
}
</style>
