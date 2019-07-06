<template>
  <div>
    <div class="legend">
      <div>
        <img class="legend-image-circle" src="../icon/top-red-marker.png" alt="">
        <span class="legend-text">Surface</span>
      </div>
      <div>
        <img class="legend-image-pin" src="../icon/red-pin-smaller.png" alt="">
        <span class="legend-text">Underground</span>
      </div>
      <div>
        <img class="legend-image-circle" src="../icon/line.png" alt="">
        <span class="legend-text">Deviation</span>
      </div>
    </div>
    <div class="classfication-legend">
      <i class="el-notification__icon el-icon-info" />
      <h2 class="el-notification__title" style="display:inline-block;margin-left:10px;position:relative;bottom:3px;margin-right:25px;">Categorical Classification</h2>
      <i class="el-notification__closeBtn el-icon-close" style="" />

      <div class="legend-content">
        <div>
          <img class="color-icon" src="../../icons/pin/pin-type1.png" alt="">
          <span>DEVELOPMENT</span>
        </div>
        <div>
          <img class="color-icon" src="../../icons/pin/pin-type2.png" alt="">
          <span>DEVELOPMENT SERVICE</span>
        </div>
        <div>
          <img class="color-icon" src="../../icons/pin/pin-type2.png" alt="">
          <span>DEVELOPMENT SERVICE</span>
        </div>
        <div>
          <img class="color-icon" src="../../icons/pin/pin-type2.png" alt="">
          <span>DEVELOPMENT SERVICE</span>
        </div><div>
          <img class="color-icon" src="../../icons/pin/pin-type2.png" alt="">
          <span>DEVELOPMENT SERVICE</span>
        </div><div>
          <img class="color-icon" src="../../icons/pin/pin-type2.png" alt="">
          <span>DEVELOPMENT SERVICE</span>
        </div><div>
          <img class="color-icon" src="../../icons/pin/pin-type2.png" alt="">
          <span>DEVELOPMENT SERVICE</span>
        </div><div>
          <img class="color-icon" src="../../icons/pin/pin-type2.png" alt="">
          <span>DEVELOPMENT SERVICE</span>
        </div><div>
          <img class="color-icon" src="../../icons/pin/pin-type2.png" alt="">
          <span>DEVELOPMENT SERVICE</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.legend{
  position: absolute;
  bottom: 40px;
  left: 30px;
}
.classfication-legend{
  position: absolute;
  background-color: white;
  bottom: 0px;
  right:  0px;
  padding: 14px 26px 14px 13px;
  border-radius: 5px;
}
.legend-image-circle{
  width: 14px;
  height: 15px;
}
.legend-image-pin{
  width: 13px;
  height: 18px;
}
.legend-text{
  font-size: 16px;
  margin-left: 3px;
}
.legend-content{
  margin: 5px 0 0 40px;
}
.color-icon{
  width: 15px;
  height: 20px;
}
</style>
