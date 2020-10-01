<template>
<!-- 水平循环滚动组件 -->
  <div class="loopScroll" ref="loopScroll" v-if="content.name!==''">
    <div class="div1" ref="div1">
      <p class="p" v-for="(item,index) in number" :key="index" :ref="'p'+index" v-html="res"></p>
    </div>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
export default {
  name: "loopScroll",
  props: {
    content: {
      type: Object,
      default() {
        return {};
      }
    },
    exam: {
      type: Boolean,
      default() {
        return true;
      }
    },
    searVal:{
      type:String,
      default(){
        return ""
      }
    }
  },
  data() {
    return {
      number: 1,
      animation: null,
      animeTarget: [],
      queryInfo: "",
      size: 0,
      timer: null
    };
  },
  mounted() {
    if (this.content.name==='') return;
    new Promise((resolve, reject) => {
      if(!this.$refs.p0[0].hasOwnProperty("offsetWidth")){
        return;
      }
      this.timer = setInterval(() => {
        if (this.size === this.$refs.p0[0].offsetWidth && this.size !== 0) {
          clearInterval(this.timer);
          resolve();
        } else {
          this.size = this.$refs.p0[0].offsetWidth;
        }
      }, 100);
    }).then(() => {
      this.animated();
    })
  },
  methods: {
    animated() {
      if (
        Math.abs(this.$refs.p0[0].offsetWidth) >
        this.$refs.loopScroll.offsetWidth
      ) {
        this.number = 2;
        this.$refs.div1.classList.add("run" + (this.content.id||this.content._id));
        this.animation = anime({
          targets: ".run" + (this.content.id||this.content._id),
          translateX: [0, -this.$refs.p0[0].offsetWidth - 10],
          loop: true,
          duration: 4000,
          easing: "linear"
        });
      }
    }
  },
  computed: {
    res() {
      let musicName=this.content.name||"",
          resArr=[];
      if (musicName && this.exam&&this.searVal ) {
        let reg = new RegExp(this.searVal, "g");
        musicName = musicName.replace(
          reg,
          `<span style="color:red;">${this.searVal}</span>`
        );
      }
      return musicName;
    }
  }
};
</script>
<style scoped>
.loopScroll {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.div1 {
  position: absolute;
  height: 30px;
  display: flex;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.p {
  padding: 4px 0;
  height: 30px;
  white-space: nowrap;
  margin: 0;
  margin-right: 10px;
}
</style>