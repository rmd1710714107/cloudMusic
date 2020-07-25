<template>
  <div class="lyric">
    <button @click="musicPanel">back</button>
    <button @click="parseLyc">parseLyc</button>
    <hr />
    <pre>{{this.$store.state.lyricInfo.lrc.lyric}}</pre>
  </div>
</template>

<script>
export default {
  name: "lyric",
  components: {},
  data() {
    return {
      lyricArray: [],
      timeArray: []
    };
  },
  methods: {
    musicPanel() {
      this.$bus.$emit("showLyric", "right");
    },
    parseLyc() {
      let lycReg = /\[{1}(.{1,})\]{1}(.{0,})/,
        timeReg = /\d{2}:\d{2}\.\d{2,3}/,
        res = this.$store.state.lyricInfo.lrc.lyric.split("\n");
      console.log(res);
      res.forEach(item => {
        item = lycReg.exec(item);
        if (Array.isArray(item)) {
          item.shift();
          item.forEach((childItem, index) => {
            if (timeReg.test(childItem)) {
             this.timeArray.push(childItem);
            } else {
             this.lyricArray.push(childItem);
            }
          });
        }
      });
      console.log(this.timeArray);
      console.log(this.lyricArray);
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
</style>