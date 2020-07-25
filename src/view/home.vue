<template>
  <div class="home">
    <el-container class="mainPanel">
      <el-aside width="150px">
        <aside-content></aside-content>
      </el-aside>
      <el-main>
        <!-- <main-content></main-content> -->
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-container class="lyricPanel">
      <lyric></lyric>
    </el-container>
  </div>
</template>

<script>
import mainContent from "./main/mainContent";
import asideContent from "./aside/asideContent";
import headerInfo from "./header/headerInfo";
import lyric from "../components/lyric";
import anime from "animejs/lib/anime.es.js";
export default {
  name: "home",
  components: {
    mainContent,
    asideContent,
    lyric
  },
  mounted() {
    this.$bus.$on("showLyric", (arg) => {
      this.showLyric(arg);
    });
  },
  methods: {
    showLyric(arg) {
      console.log(arg);
      if(arg!=="left"){
        this.direction=[0,"100%"];
      }else{
        this.direction=["100%",0];
      }
      this.animation=null;
      this.animation=anime({
        targets: ".lyricPanel",
        left: this.direction,
        autoplay: false,
        easing: 'linear'
      });
      this.animation.play();
      
    }
  },
  data () {
    return {
      animation:null,
      direction:["100%",0]
    }
  }
};
</script>
<style scoped>
.el-aside {
  overflow: hidden;
}
.home {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.el-main {
  height: 100%;
  background-color: #fff;
  padding: 0px;
}

.el-aside {
  background-color: #99ccff;
  height: 100%;
}
.home .mainPanel {
  width: 100%;
  position: absolute;
  z-index: 1;
}
.home .lyricPanel {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 999;
  left:100%;
}
</style>