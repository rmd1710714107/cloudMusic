<template>
  <div class="playProgress">
    <div class="bottom" @mousedown="down" ref="bottom">
      <div class="top" ref="top">
        <div class="circleImg" ref="circleImg" @mousemove.prevent="move"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {mixin} from "../plugins/mixin"
export default {
  name: "playProgress",
  props:{
    offset:{
      type:Number,
      default(){
        return 0;
      }
    }
  },
  mounted(){
    this.domNode=this.$refs.top
  },
  data() {
    return {
      isDown: false,
      disX: 0,
      domNode:null
    };
  },
  mixins:[mixin],
};
</script>
<style scoped>
.top {
  width: 80%;
  position: absolute;
  height: 4px;
  background: red;
}
.bottom {
  width: 100%;
  position: relative;
  height: 4px;
  background-color: blue;
  cursor: pointer;
}
.circleImg{
  width: 4px;
  height: 4px;
  position: absolute;
  right: 0px;
}
.bottom:hover .circleImg{
  width: 12px;
  height: 12px;
  position: absolute;
  top: -4px;
  right: -6px;
  border-radius: 50%;
  background-color: red;
}
</style>