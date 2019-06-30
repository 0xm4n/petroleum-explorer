
<template>
  <div class="home-container">
    <el-tabs tab-position="left">
      <el-tab-pane label="K-means">
        <el-row>
          <el-col :span="8">
            <el-checkbox v-model="checked1" label="Drillers Depth" border />
          </el-col>
          <el-col :span="8">
            <el-checkbox v-model="checked2" label="Injection Hours" border />
          </el-col>
          <el-col :span="8">
            <el-checkbox v-model="checked3" label="Location" border />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-checkbox v-model="checked4" label="Oil Production" border />
          </el-col>
          <el-col :span="8">
            <el-checkbox v-model="checked5" label="SOR" border />
          </el-col>
          <el-col :span="8">
            <el-checkbox v-model="checked6" label="Steam Injection" border />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            Number of clusters
          </el-col>
          <el-col :span="8">
            <el-select v-model="value" placeholder="select cluster number">
              <el-option
                v-for="item in numberOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-row>
        <el-row style="text-align: center;">
          <el-col :span="24">
            <el-button type="primary" size="medium" plain style="width:600px;">Search</el-button>
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
      checked1: true,
      checked2: false,
      checked3: false,
      checked4: false,
      checked5: false,
      checked6: false,
      numberOptions: [
        {
          value: 'select1',
          label: '1'
        }, {
          value: 'select2',
          label: '2'
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
        margin-top: 8px;
        width: 100%;
    }
    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}

.el-row {
    width: 600px;
    margin-right: auto;
    margin-left: auto;
    line-height: 50px;
}
.el-checkbox  {
    width: 186px;
}
</style>
