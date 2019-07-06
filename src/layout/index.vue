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
          ref="gmap"
          class="google-map"
          :center="{lat:57.222022, lng:-110.88281}"
          :zoom="13"
          map-type-id="terrain"
        >
          <gmap-info-window
            :options="infoOptions"
            :position="infoPosition"
            :opened="infoOpened"
            @closeclick="infoOpened=false"
          >
            <div class="label-title">Unique Well Identifier</div>
            <div class="label-content">{{ infoContent.uwi }}</div>
            <div class="label-title">Well Operator</div>
            <div class="label-content">{{ infoContent.operator }}</div>
            <div class="label-title">Well Status</div>
            <div class="label-content">{{ infoContent.status }}</div>
            <div class="label-title">Well Type</div>
            <div class="label-content">{{ infoContent.type }}</div>
          </gmap-info-window>

          <!-- marker -->
          <div v-if="update">
            <!-- top-marker -->
            <gmap-marker
              v-for="(mt,index) in topMarkers"
              ref="tMarker"
              :key="mt.index"
              :position="getPosition(mt)"
              :clickable="true"
              :icon="topMarkersIcon[index]"
              @click="toggleInfo(mt, mt.index)"
            />

            <!-- bottom-marker -->
            <gmap-marker
              v-for="(mb, index) in bottomMarkers"
              ref="bMarker"
              :key="mb.index"
              :position="getPosition(mb)"
              :clickable="true"
              :icon="bottomMarkersIcon[index]"
              @click="toggleInfo(mb, mb.index)"
            />
          </div>
          <!-- polyline -->
          <gmap-polyline
            v-for="l in paths"
            :key="l.index"
            :path.sync="l"
            :options="{ strokeColor:'#000000',strokeWeight: 0.8}"
          />

          <!-- polygon -->
          <gmap-polygon
            ref="polygon"
            :paths="polygons"
            :options="{strokeWeight:2}"
            :editable="true"
          />

        </GmapMap>

      </section>
      <maplegend />
    </div>
    <!-- Widget Panel -->
    <transition name="fade-transform" mode="out-in">
      <router-view
        :key="key"
        @search="updataMapData($event)"
        @polygon="polygonOperation($event)"
        @classification="classification($event, ...arguments)"
      />
    </transition>

  </div>
</template>

<script>
import _ from 'lodash'
import { Navbar, Sidebar, Maplegend } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import polygonMixin from './mixin/polygonFunction'

import http from '@/utils/http'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    Maplegend
  },
  mixins: [ResizeMixin, polygonMixin],
  data() {
    return {
      topMarkers: [],
      bottomMarkers: [],
      paths: [],
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
      },
      userDefined: '',
      polygons: [],
      topMarkersIcon: [],
      bottomMarkersIcon: [],
      update: true,
      url: ''
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
    },
    topMarkerNum() {
      return this.topMarkers.length
    },
    bottomMarkerNum() {
      return this.bottomMarkers.length
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      var self = this
      http.get('/initMapData')
        .then(function(response) {
          self.topMarkers = response.data.topPoint
          self.bottomMarkers = response.data.bottomPoint
          // topMarkersIcon数组用来存储marker当前状态，不同状态对应不同的icon
          self.topMarkersIcon = Array(self.topMarkerNum).fill({ url: require('./icon/top-red-marker.png') })
          // bottomMarkersIcon数组用来存储marker当前状态，不同状态对应不同的icon
          self.bottomMarkersIcon = Array(self.bottomMarkerNum).fill({ url: require('./icon/red-pin-smaller.png') })
          self.paths = response.data.path
        })
    },
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
    },
    updataMapData: function(params) {
      this.topMarkers = params.topPoint
      this.bottomMarkers = params.bottomPoint
      this.paths = params.path
    },
    polygonOperation(params) {
      switch (params) {
        case 1:
          this.createPolyDrawControl()
          break
        case 2:
          this.delPolyDrawControl()
          break
        case 3:
          this.highlightWells()
          break
        case 4:
          this.clearHighlightWells()
          break
        case 5:
          this.selectWells()
          break
        case 6:
          this.removeWells()
          break
        case 7:
          this.removePolygon()
          break
        case 8:
          this.resetSelection()
          break
      }
    },
    classification(params, categoryType) {
      switch (categoryType) {
        case 'Well Class':
          this.classifyWells('class')
          break
        case 'Well Current Status':
          this.classifyWells('status')
          break
        case 'Well Type':
          this.classifyWells('type')
          break
        case 'Pad':
          this.classifyWells('pad')
          break
        default:
          break
      }
    },
    classifyWells(cataType) {
      var categoryTypeArr = _.map(this.topMarkers, cataType)
      categoryTypeArr = _.uniq(categoryTypeArr)
      var catagoryTypeNum = categoryTypeArr.length
      for (let i = 0; i < this.topMarkerNum; i++) {
        var point = this.topMarkers[i]
        for (let j = 0; j < catagoryTypeNum; j++) {
          if (point[cataType] === categoryTypeArr[j]) {
            this.topMarkersIcon[i] = { url: require('@/icons/marker/marker-type' + (j + 1).toString() + '.png') }
            this.bottomMarkersIcon[i] = { url: require('@/icons/pin/pin-type' + (j + 1).toString() + '.png') }
          }
        }
      }
      var htmlMsg = ''
      for (let i = 0; i < catagoryTypeNum; i++) {
        var htmlImg = '<div><img src="' + '/icons/marker/marker-type' + (i + 1).toString() + '.png' + '"/>'
        var htmlText = '<span>' + categoryTypeArr[i] + '</span></div>'
        htmlMsg += (htmlImg)
        htmlMsg += (htmlText)
      }
      console.log(htmlMsg)
      this.update = false
      this.update = true
      this.$notify.info({
        title: 'Categorical Classification',
        dangerouslyUseHTMLString: true,
        message: '<el-image src="../icons/pin/pin-type10.png"/>',
        position: 'bottom-right',
        duration: 0
      })
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
.label-title {
    font-size: 16px;
    font-weight: 500;
    margin-top: 10px;
    color: black;
}
.label-content {
    font-size: 15px;
}
</style>
