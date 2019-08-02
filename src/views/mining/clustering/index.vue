<template>
  <div class="page-container">

    <div class="close-bar">
      <span class="sub-title">Clustering</span>
      <img class="collapse-icon" src="@/icons/collapse.png" alt="collapse" @click="closeTab">
    </div>

    <div class="main-content">
      <el-collapse v-model="activeCollapse" accordion>
        <!-- K-means -->
        <el-collapse-item name="1">
          <template slot="title">
            <span class="item-title">K-means</span>
          </template>
          <div class="expansion-content" style>
            <el-checkbox-group v-model="checkList">
              <el-row>
                <el-col :span="12">
                  <el-checkbox label="Drillers Depth" />
                </el-col>
                <el-col :span="12">
                  <el-checkbox label="Injection Hours" />
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-checkbox label="Location" />
                </el-col>
                <el-col :span="12">
                  <el-checkbox label="Oil Production" />
                </el-col>
              </el-row><el-row>
                <el-col :span="12">
                  <el-checkbox label="SOR" />
                </el-col>
                <el-col :span="12">
                  <el-checkbox label="Steam Injection" />
                </el-col>
              </el-row>
            </el-checkbox-group>
          </div>
          <el-divider />
          <el-select v-model="clusterNum" placeholder="Number of clusters">
            <el-option
              v-for="item in clusterNumOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button
            type="primary"
            plain
            style="width:200px;margin-top:15px;"
            @click="applyClustering()"
          >Apply</el-button>
        </el-collapse-item>
        <!-- Hierarchical Clustering -->
        <el-collapse-item name="2">
          <template slot="title">
            <span class="item-title">Hierarchical</span>
          </template>
          <div class="expansion-content" style>
          </div>
          <el-button
            type="primary"
            plain
            style="width:200px;margin-top:15px;"
            @click="applyClustering()"
          >Run</el-button>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeCollapse: '',
      checkList: [],
      clusterNumOption: [
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
      ],
      clusterNum: ''
    }
  },
  methods: {
    closeTab: function() {
      this.$emit('reset')
      this.$router.replace({ path: '/home' })
    },
    applyClustering: function() {
      this.$emit('clustering', this.checkList, this.clusterNum)
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
.el-col {
  text-align: left;
  padding-left: 20px;
}

</style>
