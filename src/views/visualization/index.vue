<template>
  <div class="page-container">

    <div class="close-bar">
      <span class="sub-title">Data Visualizetion</span>
      <img class="collapse-icon" src="@/icons/collapse.png" alt="collapse" @click="closeTab">
    </div>

    <div class="main-content">
      <Collapse v-model="value" accordion>
        <Panel name="1">
          <span class="item-title">Bar Chart</span>
          <p slot="content">
            <el-select v-model="value1" placeholder="Select a chart">
              <el-option
                v-for="item in barChartOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </p>
        </Panel>
        <Panel name="2">
          <span class="item-title">Pie Chart</span>
          <p slot="content">
            <el-select v-model="value2" placeholder="Select a chart">
              <el-option
                v-for="item in pieChartOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </p>
        </Panel>
        <Panel name="3">
          <span class="item-title">Time Series</span>
          <p slot="content">
            <span style="font-size:15px;">Unique Well Identifier</span>

            <el-input v-model="input" placeholder="" style="margin:10px 0;" />

            <el-select v-model="value3" placeholder="" style="width:100%;margin:10px 0;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </p>

        </Panel>
      </Collapse>
      <div style="text-align:center;margin-top:15px;">
        <el-button type="primary" plain style="width:250px;">Apply</el-button>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vaule: '',
      value1: '',
      value2: '',
      value3: '',
      barChartOptions: [
        {
          value: '1',
          label: 'Average Injection Hours'
        },
        {
          value: '2',
          label: 'Average Oil Production'
        },
        {
          value: '3',
          label: 'Average SOR'
        },
        {
          value: '4',
          label: 'Average Steam Injection'
        },
        {
          value: '5',
          label: 'Well Drillers Total Depth'
        }
      ],
      pieChartOptions: [
        {
          value: '1',
          label: 'Well Class'
        },
        {
          value: '2',
          label: 'Well Current Status'
        },
        {
          value: '3',
          label: 'Well Operator'
        },
        {
          value: '4',
          label: 'Well Province'
        },
        {
          value: '5',
          label: 'Well Type'
        },
        {
          value: '6',
          label: 'Pad'
        }
      ],
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

}

.item-title {
    font-size: 16px;
}

p {
  text-align: center;
}
</style>
