<template>
<!-- 播放控制条界面 -->
  <div class="playProgress">
    <div class="bottom" @mousedown="down" ref="bottom" @mouseup="up">
      <div class="top" ref="top" :style="{width:topWidth+'px'}">
        <div class="circleImg" ref="circleImg"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin } from "../plugins/mixin";
export default {
  name: "playProgress",
  props: {
    percent: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  mounted() {
    this.top = this.$refs.top;
    this.bottom = this.$refs.bottom;
    this.totalWidth = this.bottom.offsetWidth;
    window.addEventListener("resize", () => {
      this.totalWidth = this.bottom.offsetWidth;
    });
  },
  data() {
    return {
      disX: 0,
      domNode: null,
      mouse:{},
      topWidth:0,
      allowMove:false
    };
  },
  mixins: [mixin],
  watch:{
    percent(newPercent){
      if(this.allowMove) return;
      this.changTopWidth(newPercent);
    }
  }
};
</script>
<style scoped>
.playProgress {
  width: 100%;
}
.top {
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