var drawingManager

module.exports = {
  createPolyDrawControl: function() {
    var self = this
    drawingManager = new window.google.maps.drawing.DrawingManager({
      drawingControl: true,
      drawingControlOptions: {
        position: window.google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['polygon']
      },
      polygonOptions: {
        strokeWeight: 2,
        editable: true
      }
    })
    drawingManager.setMap(this.$refs.gmap.$mapObject)
    window.google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
      // Get overlay paths
      const paths = event.overlay.getPaths().getArray()
      // Remove overlay from map
      event.overlay.setMap(null)

      // Disable drawingManager
      drawingManager.setDrawingMode(null)

      // Create Polygon
      self.polygons = paths
      // self.savePolygon(paths)
    })
  },
  delPolyDrawControl() {
    drawingManager.setMap(null)
  },
  highlightWells() {
    for (let i = 0; i < this.topMarkers.length; i++) {
      var topPoint = new window.google.maps.LatLng(this.$refs.tMarker[i].position)
      var topIsSelect = window.google.maps.geometry.poly.containsLocation(topPoint, this.$refs.polygon.$polygonObject)
      if (topIsSelect) {
        this.topMarkersIcon[i] = { url: require('./icon/top-light-blue-marker.png') }
        this.bottomMarkersIcon[i] = { url: require('./icon/light-blue-pin-smaller.png') }
      }
    }
    for (let i = 0; i < this.bottomMarkers.length; i++) {
      var bottomPoint = new window.google.maps.LatLng(this.$refs.bMarker[i].position)
      var bottomIsSelect = window.google.maps.geometry.poly.containsLocation(bottomPoint, this.$refs.polygon.$polygonObject)
      if (bottomIsSelect) {
        this.topMarkersIcon[i] = { url: require('./icon/top-light-blue-marker.png') }
        this.bottomMarkersIcon[i] = { url: require('./icon/light-blue-pin-smaller.png') }
      }
    }
    this.update = false
    this.update = true
  },
  clearHighlightWells() {
    for (let i = 0; i < this.topMarkers.length; i++) {
      this.topMarkersIcon[i] = { url: require('./icon/top-red-marker.png') }
      this.bottomMarkersIcon[i] = { url: require('./icon/red-pin-smaller.png') }
    }
    this.update = false
    this.update = true
  }
}
