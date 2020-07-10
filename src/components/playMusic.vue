<template>
  <div class="playMusic">
    <audio ref="audio" :src="localSrc||netSrc"></audio>
    <div>
      <img src="../assets/img/CD.svg" class="imgHolder" />
    </div>
    <div class="control">
      <div class="topControl">
        <div class="changeSong">
          <div class="tabControl">
            <img class="prev" src="../assets/img/prev.svg" />
          </div>
          <div class="tabControl" @click="playMusic">
            <img class="play" :src="src" />
          </div>
          <div class="tabControl">
            <img class="next" src="../assets/img/next.svg" />
          </div>
        </div>
        <div class="musicName">
          <loop-scroll :content="this.$store.state.musicInfo" :exam="false"></loop-scroll>
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
        <play-progress :offset="240"></play-progress>
      </div>
    </div>
  </div>
</template>


<script>
import playProgress from "./playProgress";
import loopScroll from "./loopScroll";
import { handleMusicTinme } from "../plugins/utils";
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
        // if (this.$store.state.musicInfo.id) {
        //   console.log("ok");
        //   getmusicUrl(this.$store.state.musicInfo.id).then(res => {
        //     console.log(res.data.data[0].url);
        //     this.netSrc= res.data.data[0].url;
        //     this.audioDom.play();
        //   });
        // }else{
        //   this.audioDom.play();
        // }
        this.$store.commit("addPlayInfo", {
          duration: handleMusicTinme(this.audioDom.duration)
        });
        this.timer = setInterval(() => {
          if (
            parseInt(this.audioDom.duration) ===
            parseInt(this.audioDom.currentTime)
          ) {
            this.timer = null;
            return;
          }
          this.$store.commit("addPlayInfo", {
            currentTime: handleMusicTinme(this.audioDom.currentTime)
          });
        }, 1000);
        this.audioDom.play();
      } else {
        this.audioDom.pause();
        clearInterval(this.timer)
        this.timer = null;
      }
    },
    playSort() {
      ++this.index;
    }
  },
  computed: {
    src() {
      if (!this.flag) {
        return require("../assets/img/pause.svg");
      } else {
        return require("../assets/img/play.svg");
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
      }else{
        return this.$store.state.musicInfo.url;
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
  height: 99%;
  padding: 0.25% 5px;
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
</style>