<template>
  <div class="playProgress">
    <div class="bottom" @mousedown="down" ref="bottom">
      <div class="top" ref="top" :style="{width:topWidth+'px'}">
        <div class="circleImg" ref="circleImg" @mousemove.prevent="move"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin } from "../plugins/mixin";
export default {
  name: "playProgress",
  props: {
    offset: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  mounted() {
    this.domNode = this.$refs.top;
  },
  data() {
    return {
      isDown: false,
      disX: 0,
      domNode: null,
      topWidth:0
    };
  },
  mixins: [mixin],
  computed:{
    processRate(){
      return this.$store.state.processRate;
    }
  },
  watch:{
    processRate(){
      this.topWidth=this.$refs.bottom.offsetWidth*this.$store.state.processRate;
    }
  }
};
</script>
<style scoped>
.playProgress{
  /* width: calc(100% - 70px); */
  width: 100%;
}
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
  background-color: #45454662;
  cursor: pointer;
}
.circleImg {
  display: none;
}
.bottom:hover .circleImg {
  display: block;                                                          
  width: 12px;
  height: 12px;
  position: absolute;
  top: -4px;
  right: -6px;
  border-radius: 50%;
  background-color: red;
}
.item {
  margin: 4px;
}
</style>