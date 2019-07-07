<template>
  <div>
    <div class="legend">
      <div>
        <img class="legend-image-circle" src="../icon/top-red-marker.png" alt>
        <span class="legend-text">Surface</span>
      </div>
      <div>
        <img class="legend-image-pin" src="../icon/red-pin-smaller.png" alt>
        <span class="legend-text">Underground</span>
      </div>
      <div>
        <img class="legend-image-circle" src="../icon/line.png" alt>
        <span class="legend-text">Deviation</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.legend {
    position: absolute;
    bottom: 40px;
    left: 30px;
}

.legend-image-circle {
    width: 14px;
    height: 15px;
}
.legend-image-pin {
    width: 13px;
    height: 18px;
}
.legend-text {
    font-size: 16px;
    margin-left: 3px;
}
</style>
