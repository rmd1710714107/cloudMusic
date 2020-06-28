<template>
  <div class="loopScroll" ref="loopScroll">
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
    if (JSON.stringify(this.content) == "{}") return;
    new Promise((resolve, reject) => {
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
        this.$refs.div1.classList.add("run" + this.content.id);
        console.log(this.$refs.p0[0].offsetWidth);
        this.animation = anime({
          targets: ".run" + this.content.id,
          translateX: [0, -this.$refs.p0[0].offsetWidth - 10],
          loop: true,
          duration: 10000,
          easing: "linear"
        });
      }
    }
  },
  computed: {
    res() {
      if (this.content.name && this.exam) {
        let reg = new RegExp(this.$store.state.searVal, "g");
        this.content.name = this.content.name.replace(
          reg,
          `<span style="color:red;">${this.$store.state.searVal}</span>`
        );
      }
      return this.content.name;
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