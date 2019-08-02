import http from '@/utils/http'
import _ from 'lodash'

export default {
  methods: {
    categoricalClassify(cataType) {
      this.showLegend = false
      this.legendTitle = 'Categorical Classification'
      this.categoryTypeArr = _.map(this.topMarkers, cataType)
      this.categoryTypeArr = _.uniq(this.categoryTypeArr)
      this.catagoryTypeNum = this.categoryTypeArr.length
      for (let i = 0; i < this.topMarkerNum; i++) {
        var point = this.topMarkers[i]
        for (let j = 0; j < this.catagoryTypeNum; j++) {
          if (point[cataType] === this.categoryTypeArr[j]) {
            this.topMarkersIcon[i] = { url: require('@/icons/marker/marker-type' + (j + 1).toString() + '.png') }
            this.bottomMarkersIcon[i] = { url: require('@/icons/pin/pin-type' + (j + 1).toString() + '.png') }
          }
        }
      }
      this.update = false
      this.update = true
      this.showLegend = true
    },
    closeLegend() {
      this.showLegend = false
    },
    numericalClassify(cataType, classNum) {
      var self = this
      this.legendTitle = 'Numerical Classification'
      http.get('/numericalClassify',
        {
          params: {
            numericalType: cataType,
            classNum: classNum
            // numericalRadio: self.numericalRadio
          }
        }
      ).then(function(response) {
        self.categoryTypeArr = response.data.categoryTypeArr
        self.catagoryTypeNum = response.data.categoryTypeArr.length
        for (let i = 0; i < self.topMarkerNum; i++) {
          var point = response.data.points[i]
          for (let j = 0; j < self.catagoryTypeNum; j++) {
            if (point['label'] === self.categoryTypeArr[j]) {
              self.topMarkersIcon[i] = { url: require('@/icons/marker/marker-type' + (j + 1).toString() + '.png') }
              self.bottomMarkersIcon[i] = { url: require('@/icons/pin/pin-type' + (j + 1).toString() + '.png') }
            }
            if (point['label'] === 'invalid') {
              self.topMarkersIcon[i] = { url: require('@/icons/marker/marker-type10.png') }
              self.bottomMarkersIcon[i] = { url: require('@/icons/pin/pin-type10.png') }
            }
          }
        }
        self.update = false
        self.update = true
        self.showLegend = true
      })
    }
  }
}
