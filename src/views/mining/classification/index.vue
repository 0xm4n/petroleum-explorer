<template>
  <div class="page-container">

    <div class="close-bar">
      <span class="sub-title">Classification</span>
      <img class="collapse-icon" src="@/icons/collapse.png" alt="collapse" @click="closeTab">
    </div>

    <div class="main-content">
      <el-collapse v-model="activeCollapse" accordion>
        <!-- Categorical -->
        <el-collapse-item name="1">
          <template slot="title">
            <span class="item-title">Categorical</span>
          </template>
          <div class="expansion-content" style>
            <el-select
              v-model="categoryType"
              placeholder="Select Classification Type"
              size="medium"
              style="width: 250px;"
            >
              <el-option
                v-for="item in categoryOptions"
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
            @click="categoricalClassify()"
          >Apply</el-button>
        </el-collapse-item>
        <!-- Numerical -->
        <el-collapse-item name="2">
          <template slot="title">
            <span class="item-title">Numerical</span>
          </template>
          <div class="expansion-content" style>
            <el-select
              v-model="numericalType"
              placeholder="Select Classification Type"
              size="medium"
              style="width: 250px;"
            >
              <el-option
                v-for="item in numericalOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-row>
              <el-col :span="24">
                <el-select
                  v-model="classNum"
                  placeholder="Select Class Number"
                  size="medium"
                  style="width:250px;"
                >
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
                <el-radio v-model="numericalRadio" label="1">Equal Interval</el-radio>
                <el-radio v-model="numericalRadio" label="2">Quantile</el-radio>
              </el-col>
            </el-row>

          </div>
          <el-button
            type="primary"
            plain
            style="width:200px;"
            @click="numericalClassify()"
          >Apply</el-button>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      activeCollapse: '1',
      categoryType: '',
      numericalType: '',
      classNum: '',
      numericalRadio: '1',
      categoryOptions: [
        {
          value: 'Well Class',
          label: 'Well Class'
        }, {
          value: 'Well Current Status',
          label: 'Well Current Status'
        }, {
          value: 'Well Type',
          label: 'Well Type'
        }, {
          value: 'Pad',
          label: 'Pad'
        }
      ],
      numericalOptions: [
        {
          value: 'Average Injection Hours',
          label: 'Average Injection Hours'
        }, {
          value: 'Average Oil Production',
          label: 'Average Oil Production'
        }, {
          value: 'Average SOR',
          label: 'Average SOR'
        }, {
          value: 'Average Steam Injection',
          label: 'Average Steam Injection'
        }, {
          value: 'Well Drillers Total Depth',
          label: 'Well Drillers Total Depth'
        }
      ],
      classOptions: [
        {
          value: '2',
          label: '2'
        },
        {
          value: '3',
          label: '3'
        },
        {
          value: '4',
          label: '4'
        },
        {
          value: '5',
          label: '5'
        },
        {
          value: '6',
          label: '6'
        },
        {
          value: '7',
          label: '7'
        },
        {
          value: '8',
          label: '8'
        },
        {
          value: '9',
          label: '9'
        }
      ]
    }
  },
  methods: {
    closeTab: function() {
      this.$emit('reset')
      this.$router.replace({ path: '/home' })
    },
    categoricalClassify: function() {
      this.$emit('classification', this.categoryType)
    },
    numericalClassify: function() {
      this.$emit('classification', this.numericalType, this.classNum)
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

.el-row {
    width: 340px;
    margin: 25px auto;
}
.item-title {
    margin-left: 15px;
    font-size: 16px;
}

.expansion-content {
    height: 100%;
    width: 100%;
    text-align: center;
    margin-top: 10px;
}
</style>
