<template>
  <div class="page-container">
    <div class="close-bar">
      <span class="sub-title">Search</span>
      <img class="collapse-icon" src="@/icons/collapse.png" alt="collapse" @click="closeTab">
    </div>

    <div class="main-content">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item name="1">
          <template slot="title">
            <span class="item-title">UWI</span>
          </template>
          <div class="expansion-content" style>
            <el-input v-model="input" placeholder="UWI Code" style="width:200px;" />
          </div>
        </el-collapse-item>

        <el-collapse-item name="2">
          <template slot="title">
            <span class="item-title">UWI Fields</span>
          </template>
          <div class="expansion-content" style>
            <input class="short-input" type="text">
            /
            <input class="short-input" type="text">
            -
            <input class="short-input" type="text">
            -
            <input class="short-input" type="text">
            -
            <input class="short-input" type="text">
            W
            <input class="short-input" type="text">
            /
            <input class="short-input" type="text">
          </div>
        </el-collapse-item>

        <el-collapse-item title="Company" name="3">
          <template slot="title">
            <span class="item-title">Company</span>
          </template>
          <div class="expansion-content" style>
            <el-input v-model="input" placeholder="Company Name" style="width:200px;" />
          </div>
        </el-collapse-item>

        <el-collapse-item title="Status" name="4">
          <template slot="title">
            <span class="item-title">Status</span>
          </template>
          <div class="expansion-content" style>
            <el-select v-model="model1" placeholder="Select a chart" style="width:250px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-collapse-item>

        <el-collapse-item title="Production date" name="5">
          <template slot="title">
            <span class="item-title">Production Date</span>
          </template>
          <div class="expansion-content" style>
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="Pick a day"
              style="width:305px;"
            />
          </div>
        </el-collapse-item>
      </el-collapse>
      <el-button type="primary" plain style="width:200px;margin-top:30px;">Search</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: '1',
      input: '',
      options: [{
        value: 'selection1',
        label: 'Abandoned'
      }, {
        value: 'selection2',
        label: 'Abandoned & Whipstocked'
      }, {
        value: 'selection3',
        label: 'Abandoned Zone'
      }, {
        value: 'selection4',
        label: 'Drilled and Cased'
      }, {
        value: 'selection5',
        label: 'Obserbation'
      }, {
        value: 'selection6',
        label: 'Steam Assis Gravity Drain'
      }, {
        value: 'selection7',
        label: 'Suspended Steam Assis Gravity Drain'
      }],
      model1: '',
      value1: ''
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
}
.short-input {
    width: 30px;
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
