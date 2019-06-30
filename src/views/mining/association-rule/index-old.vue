<template>
  <div class="home-container">
    <el-row>
      <el-col :span="24">
        <el-button type="primary" plain style="width:200px;">Apply</el-button>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'Home',
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

</style>
