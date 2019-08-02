<template>
  <div class="page-container">
    <div class="close-bar">
      <span class="sub-title">Search</span>
      <img class="collapse-icon" src="@/icons/collapse.png" alt="collapse" @click="closeTab">
    </div>

    <div class="main-content">
      <el-collapse v-model="activeName" accordion>
        <!-- UWI Search -->
        <el-collapse-item name="1">
          <template slot="title">
            <span class="item-title">UWI</span>
          </template>
          <div class="expansion-content" style>
            <el-input v-model="uwi" placeholder="UWI Code" style="width:200px;" />
          </div>
          <el-button
            type="primary"
            plain
            style="width:200px;margin-top:20px;"
            @click="searchByUWI"
          >Search</el-button>
        </el-collapse-item>
        <!-- UWI Field Search -->
        <el-collapse-item name="2">
          <template slot="title">
            <span class="item-title">UWI Fields</span>
          </template>
          <div>
            <span style="position:relative;right:25px;">LSD</span>
            <span style="position:relative;right:12px;">SEC</span>
            <span>TWP</span>
            <span style="position:relative;left:10px;">RNG</span>
            <span style="position:relative;left:26px;">MER</span>
          </div>
          <div class="expansion-content" style>
            <input v-model="uwiFieldInput.first" class="short-input" type="text" maxlength="2">
            /
            <input v-model="uwiFieldInput.lsd" class="short-input" type="text" maxlength="2">
            -
            <input v-model="uwiFieldInput.sec" class="short-input" type="text" maxlength="2">
            -
            <input v-model="uwiFieldInput.twp" class="short-input" type="text" maxlength="3">
            -
            <input v-model="uwiFieldInput.rng" class="short-input" type="text" maxlength="2">
            W
            <input v-model="uwiFieldInput.mer" class="short-input" type="text" maxlength="1">
            /
            <input v-model="uwiFieldInput.last" class="short-input" type="text" maxlength="1">
          </div>
          <el-button type="primary" plain style="width:200px;margin-top:20px;" @click="searchByUWIField">Search</el-button>

        </el-collapse-item>
        <!-- Field Search -->
        <el-collapse-item title="Field" name="3">
          <template slot="title">
            <span class="item-title">Field</span>
          </template>
          <div class="expansion-content" style>
            <el-input v-model="input" placeholder="Field Name" style="width:200px;" />
            <el-button type="primary" plain disabled style="width:200px;margin-top:20px;">Developing</el-button>

          </div>
        </el-collapse-item>
        <!-- Status Search -->
        <el-collapse-item title="Status" name="4">
          <template slot="title">
            <span class="item-title">Status</span>
          </template>
          <div class="expansion-content" style>
            <el-select
              v-model="statusValue"
              placeholder="Select a chart"
              style="width:250px;"
            >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <el-button
            type="primary"
            plain
            style="width:200px;margin-top:30px;"
            @click="searchByStatus"
          >Search</el-button>
        </el-collapse-item>
        <!-- Date Search -->
        <!-- <el-collapse-item title="Production date" name="5">
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
          <el-button type="primary" plain disabled style="width:200px;margin-top:20px;">Developing</el-button>

        </el-collapse-item> -->
      </el-collapse>
      <el-button
        type="info"
        style="width:150px;margin-top:20px;"
        @click="clearAll"
      >Clear all</el-button>
    </div>
  </div>
</template>

<script>
import http from '@/utils/http'

export default {
  data() {
    return {
      activeName: '1',
      uwiFieldInput: {
        first: '',
        lsd: '',
        sec: '',
        twp: '',
        rng: '',
        mer: '',
        last: ''
      },
      input: '',
      statusOptions: [
        {
          value: 'ABANDONED',
          label: 'Abandoned'
        }, {
          value: 'ABANDONED & WHIPSTOCKED',
          label: 'Abandoned & Whipstocked'
        }, {
          value: 'ABANDONED ZONE',
          label: 'Abandoned Zone'
        }, {
          value: 'DRILLED AND CASED',
          label: 'Drilled and Cased'
        }, {
          value: 'OBSERBATION',
          label: 'Obserbation'
        }, {
          value: 'STEAM ASSIS GRAVITY DRAIN',
          label: 'Steam Assis Gravity Drain'
        }, {
          value: 'SUSPENDED STEAM ASSIS GRAVITY DRAIN',
          label: 'Suspended Steam Assis Gravity Drain'
        }
      ],
      statusValue: '',
      value1: ''
    }
  },
  computed: {
    uwi: {
      get() {
        return this.$store.state.map.uwi
      },
      set(value) {
        this.$store.dispatch('map/changeUWI', value)
      }
    }
  },
  methods: {
    closeTab: function() {
      this.$store.dispatch('map/changeUWI', '')
      this.$router.replace({ path: '/home' })
    },
    searchByUWI: function() {
      const that = this
      http.get('/searchByUWI',
        {
          params: {
            uwi: that.uwi
          }
        }
      )
        .then(function(response) {
          that.$emit('search', response.data)
        })
    },
    searchByUWIField: function() {
      const that = this
      http.get('/searchByUWIField',
        {
          params: {
            first: that.uwiFieldInput.first,
            lsd: that.uwiFieldInput.lsd,
            sec: that.uwiFieldInput.sec,
            twp: that.uwiFieldInput.twp,
            rng: that.uwiFieldInput.rng,
            mer: that.uwiFieldInput.mer,
            last: that.uwiFieldInput.last
          }
        }
      )
        .then(function(response) {
          that.$emit('search', response.data)
        })
    },
    searchByStatus: function() {
      const that = this
      http.get('/searchByStatus',
        {
          params: {
            status: this.statusValue
          }
        }
      )
        .then(function(response) {
          that.$emit('search', response.data)
        })
    },
    clearAll: function() {
      var that = this
      that.uwiFieldInput.first = ''
      that.uwiFieldInput.lsd = ''
      that.uwiFieldInput.sec = ''
      that.uwiFieldInput.twp = ''
      that.uwiFieldInput.rng = ''
      that.uwiFieldInput.mer = ''
      that.uwiFieldInput.last = ''
      http.get('/initMapData')
        .then(function(response) {
          that.$emit('search', response.data)
        })
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
