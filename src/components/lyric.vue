<template>
  <div class="lyric">
    <button @click="musicPanel">back</button>
    <!-- <button @click="parseLyc">parseLyc</button> -->
    <hr />
    <ul id="lyricUl" ref="lyricUl">
      <!-- <li v-for="(item,index) in lyricArray" :key="index">{{item}}</li> -->
      <li v-for="(item,index) in lyricArray" :key="index">{{item.content}}</li>
    </ul>
  </div>
</template>

<script>
import Scrollbar from 'smooth-scrollbar';
export default {
  name: "lyric",
  components: {},
  data() {
    return {
      lyricArray: [],
      lyricIndex: -1,
      lyric: ""
    };
  },
  mounted() {
    this.$bus.$on("playing", arg => {
      if (JSON.stringify(this.$store.state.lyricInfo) !== "{}") {
        if(this.$store.state.lyricInfo.uncollected){
          this.$bus.$off("playing");
          this.lyric="无歌词";
          console.log(this.$store.state.lyricInfo.uncollected);
          return ;
        }
        this.lyricArray = [];
        this.lyricIndex = -1;
        this.parseLyc();
        this.$store.commit("addLyricInfo", {});
      }
      this.switchLyc(arg);
    });
  },
  updated() {
    //this.lyricArray=[];
  },
  methods: {
    musicPanel() {
      this.$bus.$emit("showLyric", "right");
    },
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
      console.log(this.$refs.lyricUl);
      Scrollbar.init(document.querySelector('#lyricUl'));
      // 
    },
    switchLyc(time = 0) {
      if (this.lyricArray.length !== 0) {
        if (
          time >= this.lyricArray[this.lyricIndex + 1].time &&
          time < this.lyricArray[this.lyricIndex + 2].time
        ) {
          this.lyricIndex++;
        }
        // console.log(this.lyricArray[this.lyricIndex].content);
        // this.lyric =
        //   this.lyricArray[this.lyricIndex].content ||
        //   this.lyricArray[this.lyricIndex - 1].content;
      }
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
  background-color: #fff;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.lyric #lyricUl{
  width: 100%;
  height: 500px;
  overflow: auto;
}
</style>