<template>
  <div class="page-container">
    <el-container>
      <el-aside width="160px">
        <div class="left-part">
          <div class="map-annotation">
            <div class="icon-pair">
              <img class="marker-icon" src="./icon/red-flags.png" alt>
              <img class="marker-icon" src="./icon/blue-flags.png" alt>
            </div>
            <el-radio
              v-model="radio"
              label="1"
              style="display:block;margin-top:5px;"
            >Underground</el-radio>
          </div>
          <div class="map-annotation">
            <div class="icon-pair">
              <img class="marker-icon" src="./icon/red-circle.png" alt>
              <img class="marker-icon" src="./icon/blue-circle.png" alt>
            </div>
            <el-radio
              v-model="radio"
              label="2"
              style="display:block;margin-top:5px;"
              size="medium"
            >Surface</el-radio>
          </div>
        </div>
      </el-aside>
      <el-main>
        <el-row>
          <el-col :span="24">0 wells intersected</el-col>
        </el-row>
        <el-row :gutter="35">
          <el-col :span="12">
            <el-button type="info" plain>Highlight wells</el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="info" plain>Select wells</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="35">
          <el-col :span="12">
            <el-button type="info" plain>Clear highlighted wells</el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="info" plain>Remove selection</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-button type="info" plain>Reset selection</el-button>
          </el-col>
        </el-row>
      </el-main>
    </el-container>

    <!-- <div class="left-part">
      <div class="map-annotation">
        <div class="icon-pair">
          <img class="marker-icon" src="./icon/red-flags.png" alt="">
          <img class="marker-icon" src="./icon/blue-flags.png" alt="">
        </div>
        <el-radio v-model="radio" label="1" style="display:block;margin-top:5px;">Underground</el-radio>
      </div>
      <div class="map-annotation">
        <div class="icon-pair">
          <img class="marker-icon" src="./icon/red-circle.png" alt="">
          <img class="marker-icon" src="./icon/blue-circle.png" alt="">
        </div>
        <el-radio v-model="radio" label="2" style="display:block;margin-top:5px;" size="medium">Surface</el-radio>
      </div>
        </div>-->
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      radio: '1'
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.page {
    &-container {
        width: 100%;
        height: calc(30vh - 50px);
        position: relative;
    }
    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}
.el-aside {
    position: relative;
}

.left-part {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
}
.el-row {
    text-align: center;
}
.el-col {
    margin-top: 5px;
    margin-bottom: 5px;
}
.el-button {
    width: 100%;
}
.map-annotation {
    margin: 25px 20px;
}
.marker-icon {
    width: 30px;
    height: 30px;
}
.icon-pair {
    margin-left: 30px;
}
</style>
