<template>
  <div class="playMusic">
    <audio ref="audio" :src="localSrc||netSrc" @timeupdate="playIng"></audio>
    <div class="holder">
      <img :src="musicImg" class="imgHolder" />
      <p class="laric" @click="showLyric">词</p>
    </div>
    <div class="control">
      <div class="topControl">
        <div class="changeSong">
          <div class="tabControl" @click="switchSong('prevMusic')">
            <img class="prev" src="../assets/img/prev.svg" />
          </div>
          <div class="tabControl" @click="playMusic">
            <img class="play" :src="src" />
          </div>
          <div class="tabControl" @click="switchSong('nextMusic') ">
            <img class="next" src="../assets/img/next.svg" />
          </div>
        </div>
        <div class="musicName">
          <loop-scroll :content="musicInfo" :exam="false"></loop-scroll>
        </div>
        <div class="playSet">
          <div class="volumeControl">
            <img class="valumeImg" src="../assets/img/volume.svg" />
            <div class="valume">
              <play-progress :offset="652.03"></play-progress>
            </div>
          </div>
          <div class="playControl" @click="playSort">
            <img class="playImg" :src="playSrc" />
          </div>
        </div>
      </div>
      <div class="progress">
        <p class="time">{{this.$store.state.musicTime.currentTime}}</p>
        <play-progress :offset="240"></play-progress>
        <p class="time">{{this.$store.state.musicTime.duration}}</p>
      </div>
    </div>
  </div>
</template>


<script>
import playProgress from "./playProgress";
import loopScroll from "./loopScroll";
import { handleMusicTinme } from "../utils/utils";
import { getLyric, getComments } from "../netWork/request";
export default {
  name: "playMusic",
  components: {
    playProgress,
    loopScroll
  },
  data() {
    return {
      flag: false,
      index: 0,
      value: 0,
      audioDom: null,
      timer: null,
      netSrc: ""
    };
  },
  mounted() {
    this.audioDom = this.$refs.audio;
  },
  methods: {
    playMusic() {
      this.flag = !this.flag;
      if (this.flag) {
        this.$store.commit("setMusicTime", {
          duration: handleMusicTinme(this.audioDom.duration)
        });
        this.audioDom.play();
      } else {
        this.pause();
      }
    },
    playIng() {
      if (
        parseInt(this.audioDom.duration) < parseInt(this.audioDom.currentTime)
      ) {
        this.pause();
      }
      this.$store.commit("setMusicTime", {
        currentTime: handleMusicTinme(this.audioDom.currentTime)
      });
      if (this.flag) {
        this.$bus.$emit("playing", this.audioDom.currentTime);
      }
    },
    playSort() {
      ++this.index;
    },
    pause() {
      if (this.flag) {
        this.flag = !this.flag;
      }
      this.audioDom.pause();
      clearInterval(this.timer);
      this.timer = null;
      this.$store.commit("setMusicTime", {
        currentTime: handleMusicTinme(this.audioDom.currentTime)
      });
    },
    switchSong(type) {
      this.$bus.$emit("switchSong", type);
    },
    async showLyric() {
      if (JSON.stringify(this.$store.state.musicComments) === "{}") {
        let comments = await getComments(this.musicInfo.id);
        this.$store.commit("addMusicComments", comments.data);
      }
      this.$bus.$emit("showLyric", "left");
    }
  },
  computed: {
    src() {
      if (this.flag) {
        return require("../assets/img/play.svg");
      } else {
        return require("../assets/img/pause.svg");
      }
    },
    playSrc() {
      if (this.index > 3) {
        this.index = 0;
      }
      switch (this.index) {
        case 0:
          return require("../assets/img/sort.svg");
          break;
        case 1:
          return require("../assets/img/singleLoop.svg");
          break;
        case 2:
          return require("../assets/img/radom.svg");
          break;
        default:
          return require("../assets/img/loop.svg");
          break;
      }
    },
    localSrc() {
      if (this.$store.state.musicInfo.path) {
        return "local-resource://" + this.$store.state.musicInfo.path;
      } else {
        return this.$store.state.musicInfo.url;
      }
    },
    musicImg() {
      if (this.$store.state.musicInfo.url) {
        return this.$store.state.musicInfo.picUrl;
      } else {
        return require("../assets/img/CD.svg");
      }
    },
    musicInfo() {
      return this.$store.state.musicInfo;
    }
  },
  watch: {
  async musicInfo(){
    if (this.$store.state.musicInfo.id) {
        let lyric = await getLyric(this.$store.state.musicInfo.id);
        this.$store.commit("addMusicComments", {});
        this.$store.commit("addLyricInfo", lyric.data);
      }
  }
  }
};
</script>
<style scoped>
.playMusic {
  width: calc(100% - 150px);
  height: 70px;
  position: fixed;
  background-color: #fff;
  bottom: 0;
  display: flex;
  justify-content: flex-start;
}
.playMusic .imgHolder {
  width: 80px;
  height: 100%;
  position: absolute;
  z-index: 1;
}
.playMusic .holder {
  width: 80px;
}
.playMusic .control {
  height: 100%;
  width: calc(100% - 80px);
  display: flex;
  flex-direction: column;
}
.topControl {
  height: 30px;
  padding: 4px 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.changeSong {
  width: 96px;
}
.playSet {
  width: 170px;
}
.changeSong,
.playSet {
  display: flex;
  justify-content: space-between;
}
.progress {
  width: 100%;
  height: 40px;
  padding: calc(calc(40px - 5px) / 2) 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.prev,
.play,
.next {
  width: 18px;
  height: 18px;
}
.tabControl {
  width: 22px;
  height: 22px;
  cursor: pointer;
  padding: 2px;
}
.volumeControl {
  display: flex;
  width: 120px;
  justify-content: space-between;
}
.valume {
  position: relative;
  cursor: pointer;
  width: 80px;
  height: 4px;
  border-radius: 1.5px;
  background-color: blue;
  margin: auto 0;
}
.volumeStatus {
  position: absolute;
  width: 80px;
  height: 4px;
  background-color: red;
  border-radius: 1.5px;
}
.playControl,
.playImg {
  width: 22px;
  height: 22px;
  cursor: pointer;
}
.top {
  width: 80%;
  position: absolute;
  height: 4px;
  background: red;
}
.bottom {
  width: 100%;
  position: relative;
  height: 4px;
  background-color: blue;
  cursor: pointer;
}
.bottom:hover .circleImg,
.valume:hover .circleImg {
  width: 12px;
  height: 12px;
  position: absolute;
  top: -4px;
  right: -6px;
  border-radius: 50%;
  background-color: red;
}
.circleImg {
  width: 4px;
  height: 4px;
  position: absolute;
  right: 0px;
}
.playMusic .musicName {
  width: 200px;
}
.time {
  width: 30px;
  height: 12px;
  font-size: 10px;
  text-align: center;
  margin: 0 0 6px 0;
}
.playMusic .holder {
  position: relative;
}
.playMusic .laric {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 9999;
  color: #fff;
  font-size: 50px;
  text-align: center;
  background-color: rgb(150, 143, 143);
  cursor: pointer;
  opacity: 0.5;
  visibility: hidden;
}
.playMusic .holder:hover .laric {
  visibility: visible;
}
</style>                                                                                                                                                                                                                      