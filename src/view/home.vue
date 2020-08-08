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
      <el-button circle icon="el-icon-right" @click.native="musicPanel" type="info" class="back" size="small"></el-button>
      <el-main class="lyricMain" ref="lyricMain">
        <div class="lyricPic">
          <el-row>
            <el-col :span="12"></el-col>
            <el-col :span="12">
              <lyric></lyric>
            </el-col>
          </el-row>
        </div>
        <div class="comment">
          <comment></comment>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Scrollbar from 'smooth-scrollbar';
import mainContent from "./main/mainContent";
import asideContent from "./aside/asideContent";
import headerInfo from "./header/headerInfo";
import lyric from "../components/lyric";
import anime from "animejs/lib/anime.es.js";
import comment from "../components/comment"
export default {
  name: "home",
  components: {
    mainContent,
    asideContent,
    lyric,
    comment
  },
  mounted() {
    this.$bus.$on("showLyric", (arg) => {
      this.showLyric(arg);
    });
    console.log(this.$refs.lyricMain.$el);
    Scrollbar.init(this.$refs.lyricMain.$el);
  },
  methods: {
    musicPanel() {
      this.$bus.$emit("showLyric", "right");
    },
    showLyric(arg) {
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
.mainPanel .el-main {
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
}
.home .lyricPanel {
  width: 100%;
  height: 100%;
  position: absolute;
  left:100%;
  background:linear-gradient(-45deg, #333545, #070708, #333540);
}
.lyricPanel .back{
position: absolute;
top: 3px;
left: 3px;
z-index: 999;
}
.lyricPanel .lyricMain{
  height: 100%;
  overflow: auto;
}

</style>