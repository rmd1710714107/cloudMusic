<template>
  <div class="cdPic">
    <div class="play-bar-support">
      <img src="../assets/img/play-bar-support.png" alt />
    </div>
    <div class="play-bar">
      <img src="../assets/img/play-bar.png" class="bar" />
    </div>
    <div class="Pic">
      <div class="imgWrap">
        <img :src="musicImg" class="img" />
      </div>
    </div>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
export default {
  name: "cdPic",
  components: {},
  data() {
    return {
      picAnime:null,
      barAnime:null
    };
  },
  mounted () {
    this.$bus.$on("playing",()=>{
      this.picRoate();
    })
  },
  computed: {
    musicImg() {
      if (this.$store.state.musicInfo.url) {
        return this.$store.state.musicInfo.picUrl;
      } else {
        return require("../assets/img/CD.svg");
      }
    }
  },
  methods: {
    barRoate() {},
    picRoate() {
      if(!this.picAnime){
        this.picAnime=anime({
          targets: ".Pic",
          rotate: "360deg",
          duration: 20000,
          loop:true,
          easing: 'linear'
        });
        this.picAnime.play();
      }
    }
  }
};
</script>
<style scoped>
.cdPic {
  width: 100%;
}
.cdPic .play-bar-support {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-shadow: 0 0 3px #fff;
  position: relative;
  z-index: 2;
  left: 0px;
  right: 0px;
  top: -28px;
  margin: 0 auto;
}
.cdPic .play-bar {
  transform-origin: 0 0;
  transform: rotate(-25deg);
  transition: all 0.3s;
  position: relative;
}
.cdPic .bar {
  width: 80px;
  height: 127px;
  position: absolute;
  left: calc(50% - 6px);
  top: 55px;
  z-index: 1;
}
.play-bar-support img {
  width: 100%;
}
.cdPic .Pic {
  width: 270px;
  height: 270px;
  margin: 0 auto;
  border: 40px solid #0e0e11;
  border-radius: 50%;
  box-shadow: 0 0 10px #fff;
  position: relative;
  top: 50px;
  display: flex;
  justify-content: center;
}

.cdPic .imgWrap {
  border: 5px solid #fff;
  border-radius: 50%;
}
.cdPic .img {
  width: 180px;
  height: 180px;
  border-radius: 50%;
}
</style>