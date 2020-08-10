<template>
  <div class="lyric">
    <h1 class="musicName">{{this.$store.state.musicInfo.name}}</h1>
    <div class="lyricWrap">
      <ul id="lyricUl" ref="lyricUl">
        <li
          v-for="(item,index) in lyricArray"
          :key="index"
          :class="{activeLi:activeIndex===index}"
        >{{item.content}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Scrollbar from "smooth-scrollbar";
import anime from "animejs/lib/anime.es.js";
import { duration } from "moment";
export default {
  name: "lyric",
  components: {},
  data() {
    return {
      lyricArray: [],
      lyricIndex: -1,
      lyric: "",
      scroll: null,
      activeIndex: 0,
      animation: null
    };
  },
  mounted() {
    this.$bus.$on("playing", arg => {
      if (JSON.stringify(this.$store.state.lyricInfo) !== "{}") {
        if (this.$store.state.lyricInfo.uncollected) {
          this.$bus.$off("playing");
          this.lyric = "无歌词";
          return;
        }
        this.lyricArray = [];
        this.lyricIndex = -1;
        this.parseLyc();
        this.$store.commit("addLyricInfo", {});
      }
      this.switchLyc(arg);
    });
  },
  methods: {
    parseLyc() {
      if (this.lyricInfo.uncollected) return;
      let lycReg = /\[{1}(.{1,})\]{1}(.{0,})/,
        timeReg = /\d{2}:\d{2}\.\d{2,3}/,
        res = this.lyricInfo.lrc.lyric.split("\n");
      this.lyricArray = [];
      res.forEach((item, index) => {
        let infoObj = {};
        item = lycReg.exec(item);
        if (Array.isArray(item)) {
          item.shift();
          if (timeReg.test(item[0])) {
            item[0] = item[0].split(":");
            if (parseInt(item[0][0]) >= 1) {
              item[0] = parseInt(item[0][0]) * 60 + parseFloat(item[0][1]);
            } else {
              item[0] = item[0][1];
            }
            infoObj.time = parseFloat(item[0]);
            infoObj.content = item[1];
            this.lyricArray.push(infoObj);
          }
        }
      });
    },
    switchLyc(time = 0) {
      if (this.lyricArray.length !== 0) {
        if (
          time >= this.lyricArray[this.lyricIndex + 1].time &&
          time < this.lyricArray[this.lyricIndex + 2].time
        ) {
          this.lyricIndex++;
          if (this.lyricIndex >= 4) {
            //this.$refs.lyricUl.style.top = -(this.lyricIndex - 4) * 30 + "px";
            let dis=-(this.lyricIndex - 4) * 30;
            this.switchAnime(dis);
          }
          this.activeIndex = this.lyricIndex;
          
        }
        
      }
    },
    switchAnime(dis) {
      this.animation = anime({
        targets: "#lyricUl",
        translateY: dis,
        easing: "easeInOutCubic",
        duration: 1000
      });
    }
  },
  computed: {
    lyricInfo() {
      return this.$store.state.lyricInfo;
    }
  }
};
</script>
<style scoped>
.lyric {
  width: 100%;
  height: 100%;
}
.lyric .lyricWrap {
  width: 100%;
  height: 270px;
  overflow: hidden;
  position: relative;
}
.lyric #lyricUl {
  list-style: none;
  position: absolute;
  width: 100%;
}
.lyric #lyricUl li {
  height: 30px;
  color: #fff;
  text-align: center;
  opacity: 0.3;
  padding: 5px 0;
}
.lyric #lyricUl .activeLi {
  color: red;
  opacity: 1;
}
.lyric .musicName {
  color: #fff;
  text-align: center;
}
</style>