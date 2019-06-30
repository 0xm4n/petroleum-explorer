<template>
  <div class="home-container">

    <div class="close-bar">
      <span class="sub-title">Data-Export</span>
      <img class="collapse-icon" src="@/icons/collapse.png" alt="collapse" @click="closeTab">
    </div>

    <div class="main-content">
      <el-row>
        <el-col :span="24">
          <span style="color:#888;font-size:16px;">File name</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-input v-model="input" placeholder="(optional)" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-button type="primary" plain style="width:100%">Export</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      input: ''
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
.home {
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

.el-row {
    margin:10px 30px;
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
  margin-top: 15px;
}

</style>
