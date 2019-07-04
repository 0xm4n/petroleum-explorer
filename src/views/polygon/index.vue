<template>
  <div class="page-container">
    <div class="close-bar">
      <span class="sub-title">Polygon Selection</span>
      <img class="collapse-icon" src="@/icons/collapse.png" alt="collapse" @click="closeTab">
    </div>

    <div class="main-content">
      <!-- <el-row>
        <el-col :span="12">
          <img class="marker-icon" src="./icon/red-flags.png" alt>
          <img class="marker-icon" src="./icon/blue-flags.png" alt>
        </el-col>
        <el-col :span="12" style="position:relative;right:10px;">
          <img class="marker-icon" src="./icon/red-circle.png" alt>
          <img class="marker-icon" src="./icon/blue-circle.png" alt>
        </el-col>
      </el-row> -->

      <!-- <el-row>
        <el-col :span="12">
          <el-radio
            v-model="radio"
            label="1"
            style="display:block;margin-top:3px;"
          >
            <span style="font-size:16px;">Underground</span>
          </el-radio>
        </el-col>
        <el-col :span="12">
          <el-radio
            v-model="radio"
            label="2"
            style="display:block;margin-top:3px;position:relative;right:23px;"
            size="medium"
          >
            <span style="font-size:16px;">Surface</span>
          </el-radio>
        </el-col>
      </el-row> -->
      <div class="button-block">
        <div class="block-pair">
          <el-row>
            <el-col :span="24">
              <el-button type="primary" plain style="width:250px;" @click="highlight()">Highlight wells</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-button type="primary" plain style="width:250px;" @click="clearHighlight()">Clear highlighted wells</el-button>
            </el-col>
          </el-row>
        </div>

        <div class="block-pair">
          <el-row>
            <el-col :span="24">
              <el-button type="primary" plain style="width:250px;" @click="selectWells()">Select wells</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-button type="primary" plain style="width:250px;" @click="removeWells()">Remove wells</el-button>
            </el-col>
          </el-row>
        </div>

        <div class="block-pair">
          <el-row>
            <el-col :span="24">
              <el-button type="primary" plain style="width:250px;" @click="removePolygon()">Remove polygon</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-button type="primary" plain style="width:250px;" @click="resetSelection()">Reset selection</el-button>
            </el-col>
          </el-row>
        </div>

        <!-- <el-row>
          <el-col :span="24">
            0 wells intersected
          </el-col>
        </el-row> -->
      </div>

    </div>
  </div>
</template>

<script>
// 1 stand for create drawing control
// 2 stand for remove drawing control
// 3 stand for highlight wells
// 4 stand for clear highlight wells
// 5 stand for select wells
// 6 stand for remove wells
// 7 stand for remove polygon
// 8 stand for reset selection
export default {
  data() {
    return {
      radio: '1'
    }
  },
  created() {
    this.$emit('polygon', 1)
  },
  methods: {
    closeTab: function() {
      this.$emit('polygon', 2)
      this.$router.replace({ path: '/home' })
    },
    highlight() {
      this.$emit('polygon', 3)
    },
    clearHighlight() {
      this.$emit('polygon', 4)
    },
    selectWells() {
      this.$emit('polygon', 5)
    },
    removeWells() {
      this.$emit('polygon', 6)
    },
    removePolygon() {
      this.$emit('polygon', 7)
    },
    resetSelection() {
      this.$emit('polygon', 8)
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
    text-align: center;
    margin-top: 15px;
}

.marker-icon {
    width: 30px;
    height: 30px;
}
.button-block{
  margin: 15px 5px;
}
.el-row{
  margin: 5px 0;
}

.block-pair{
  margin: 25px 5px;
}
</style>
