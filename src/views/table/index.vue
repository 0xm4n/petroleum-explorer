<template>
  <div>
    <el-dialog
      title="Wells Data"
      :visible.sync="tableDialogVisible"
      width="70%"
      :modal-append-to-body="false"
      :before-close="closeTab"
      top="2vh"
    >
      <el-table
        :data="tableData"
        stripe
        border
        height="75vh"
        style="width: 100%"
      >
        <el-table-column
          type="index"
        />
        <el-table-column
          prop="UWI"
          label="UWI"
          width="165"
        />
        <el-table-column
          prop="Well Name"
          label="Well Name"
          width="160"
        />
        <el-table-column
          prop="Well Operator"
          label="Well Operator"
          width="115"
        />
        <el-table-column
          prop="Well Status"
          label="Well Status"
          width="110"
        />
        <el-table-column
          prop="Province"
          label="Province"
        />
        <el-table-column
          prop="Class"
          label="Class"
        />
        <el-table-column
          prop="Drillers Total Depth"
          label="Drillers Total Depth"
          sortable
          width="175"
        />
        <el-table-column
          prop="Well Type"
          label="Well Type"
          width="100"
        />
        <el-table-column
          prop="Pad"
          label="Pad"
          width="55"
        />
        <el-table-column
          prop="Top Longitude"
          label="Top Longitude"
          width="120"
        />
        <el-table-column
          prop="Top Latitude"
          label="Top Latitude"
          width="110"
        />
        <el-table-column
          prop="Bottom Longitude"
          label="Bottom Longitude"
          width="145"
        />
        <el-table-column
          prop="Bottom Latitude"
          label="Bottom Latitude"
          width="130"
        />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeTab">Close</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import http from '@/utils/http'
export default {
  name: 'Home',
  data() {
    return {
      input: '',
      tableDialogVisible: false,
      tableData: []
    }
  },
  created() {
    this.tableDialogVisible = true
    const self = this
    http.get('/getTableData',
      {
        params: {
        }
      }
    )
      .then(function(response) {
        self.tableData = response.data
      })
  },
  methods: {
    closeTab: function() {
      this.tableDialogVisible = false
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
