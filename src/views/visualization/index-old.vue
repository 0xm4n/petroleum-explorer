<template>
  <div class="home-container">
    <el-tabs tab-position="left">
      <el-tab-pane label="Bar Chart">
        <el-row>
          <el-col :span="6">
            <el-button type="primary" plain>Average Injection Hours</el-button>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" plain>Average Oil Production</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-button type="primary" plain>Average SOR</el-button>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" plain>Average Steam Injection</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-button type="primary" plain>Well Drillers Total Depth</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="Pie Chart">
        <el-row>
          <el-col :span="6">
            <el-button type="primary" plain>Well Class</el-button>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" plain>Well Current Status</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-button type="primary" plain>Well Operator</el-button>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" plain>Well Province</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-button type="primary" plain>Well Type</el-button>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" plain>Pad</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Time Series" style="margin-left:20px;">
        <el-row>
          <el-col :span="6">
            <span>Unique Well Identifier</span>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="6">
            <el-input v-model="input" placeholder="Please input the UWI" />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-select v-model="value" placeholder="" style="width:100%;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-button type="primary" plain style="width:100%;">Apply</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      input: '',
      options: [
        {
          value: '选项1',
          label: 'Injection'
        },
        {
          value: '选项2',
          label: 'Production'
        },
        {
          value: '选项3',
          label: 'SOR'
        },
        {
          value: '选项4',
          label: 'Well Status'
        }
      ],
      value: ''
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
    margin-top: 10px;
  }
  &-text {
    font-size: 50px;
    line-height: 66px;
  }
}
.el-button {
    width: 250px;
}
.el-row {
    margin:10px 30px;
}
</style>
