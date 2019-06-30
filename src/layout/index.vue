<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device==='mobile'&&sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <!-- Sidebar -->
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <!-- Navbar -->
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <!-- Google Map -->
      <section class="app-main">
        <GmapMap
          class="google-map"
          :center="{lat:57.222022, lng:-110.88281}"
          :zoom="13"
          map-type-id="terrain"
        >
          <gmap-info-window :options="infoOptions" :position="infoPosition" :opened="infoOpened" @closeclick="infoOpened=false">
            <div class="label-title">Unique Well Identifier</div>
            <div class="label-content">{{ infoContent.uwi }}</div>
            <div class="label-title">Well Operator</div>
            <div class="label-content">{{ infoContent.operator }}</div>
            <div class="label-title">Well Status</div>
            <div class="label-content">{{ infoContent.status }}</div>
            <div class="label-title">Well Type</div>
            <div class="label-content">{{ infoContent.type }}</div>
          </gmap-info-window>

          <!-- top -->
          <gmap-marker
            v-for="mt in topMarkers"
            :key="mt.index"
            :position="getPosition(mt)"
            :clickable="true"
            :icon="{ url: require('./icon/top-red-marker.png')}"
            @click="toggleInfo(mt, mt.index)"
          />

          <!-- bottom -->
          <gmap-marker
            v-for="mb in bottomMarkers"
            :key="mb.index"
            :position="getPosition(mb)"
            :clickable="true"
            :icon="{ url: require('./icon/red-pin-smaller.png')}"
            @click="toggleInfo(mb, mb.index)"
          />
          <gmap-polyline
            v-for="l in paths"
            :key="l.index"
            :path.sync="l"
            :options="{ strokeColor:'#000000',strokeWeight: 0.8}"
          />
        </GmapMap>
      </section>
      <maplegend />
    </div>
    <!-- Widget Pane -->
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </div>
</template>

<script>
import { Navbar, Sidebar, Maplegend } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import http from '@/utils/http'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    Maplegend
  },
  mixins: [ResizeMixin],
  data() {
    return {
      topMarkers: [],
      bottomMarkers: [],
      paths: [],
      icon: 'icon/red-circle.png',
      infoPosition: null,
      infoCurrentKey: null,
      infoOpened: false,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -25
        }
      },
      infoContent: {
        uwi: null,
        operator: null,
        status: null,
        type: null
      }
    }
  },
  computed: {
    key() {
      return this.$route.path
    },
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  created() {
    var that = this
    http.get('/getWellsTopPoint')
      .then(function(response) {
        that.topMarkers = response.data
      })
    http.get('/getWellsBottomPoint')
      .then(function(response) {
        that.bottomMarkers = response.data
      })
    http.get('/getWellsPath')
      .then(function(response) {
        that.paths = response.data
      })
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    getPosition: function(marker) {
      return {
        lat: parseFloat(marker.lat),
        lng: parseFloat(marker.lng)
      }
    },
    toggleInfo: function(marker, key) {
      this.infoPosition = this.getPosition(marker)
      this.infoContent.uwi = marker.uwi
      this.infoContent.operator = marker.operator
      this.infoContent.status = marker.status
      this.infoContent.type = marker.type
      if (this.infoCurrentKey === key) {
        this.infoOpened = !this.infoOpened
      } else {
        this.infoOpened = true
        this.infoCurrentKey = key
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar {
        position: fixed;
        top: 0;
    }
}
.drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
}

.fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
}

.hideSidebar .fixed-header {
    width: calc(100% - 54px);
}

.mobile .fixed-header {
    width: 100%;
}

.app-main {
    /*50 = navbar  */
    min-height: calc(100vh - 50px);
    /* width: 100%; */
    /* height: 100%; */
    position: relative;
    overflow: hidden;
}
.fixed-header + .app-main {
    padding-top: 50px;
}
.el-popup-parent--hidden {
    .fixed-header {
        padding-right: 15px;
    }
}
.google-map {
    width: 100%;
    height: calc(100vh - 50px);
}
.label-title{
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
  color:black;
}
.label-content{
  font-size: 15px;
}
</style>
