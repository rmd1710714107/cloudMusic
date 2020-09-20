<template>
<!-- 歌词组件 -->
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
import anime from "animejs/lib/anime.es.js";
import { duration } from "moment";
import {message} from "../utils/utils"
export default {
  name: "lyric",
  components: {},
  data() {
    return {
      lyricArray: [],
      lyricIndex: -1,
      scroll: null,
      activeIndex: -1,
      animation: null,
    };
  },
  mounted() {
    this.$bus.$on("playing", (arg) => {
      if (this.lyricArray.length === 0) return;
    });
  },
  methods: {
    parseLyc() {
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
        let currentLine = this.getCurrentLine(time);
        this.activeIndex = currentLine;
        if (currentLine >= 4) {
          let dis = -(currentLine - 4) * 30;
          this.switchAnime(dis);
        }
        
      }
    },
    getCurrentLine(time) {
      try {
        for (let i = 1; i < this.lyricArray.length; i++) {
          if (time < this.lyricArray[i].time) {
            return i-1;
          }
        }
        return this.lyricArray.length - 1;
      } catch (err) {
        message("error","程序出错，请联系开发者");
      }
    },
    switchAnime(dis) {
      this.animation = anime({
        targets: "#lyricUl",
        translateY: dis,
        easing: "easeInOutCubic",
        duration: 100,
      });
    },
  },
  computed: {
    lyricInfo() {
      return this.$store.state.lyricInfo;
    },
  },
  watch: {
    lyricInfo() {
      if (JSON.stringify(this.$store.state.lyricInfo) !== "{}") {
        if (this.$store.state.lyricInfo.nolyric == true) {
          this.$bus.$off("playing");
          this.lyricArray = [{ content: "无歌词" }];
          return;
        }
        if (this.$store.state.lyricInfo.uncollected == true) {
          this.$bus.$off("playing");
          this.lyricArray = [{ content: "歌词未收录" }];
          return;
        }
        this.lyricArray = [];
        this.lyricIndex = -1;
        this.parseLyc();
      }else{
        this.lyricArray = [];
      }
    },
  },
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