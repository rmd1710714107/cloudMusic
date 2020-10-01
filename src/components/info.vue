<template>
  <!-- 侧边栏按钮 -->
  <div class="info">
    <el-button class="childInfo" @click="importMusic">{{msg}}</el-button>
    <info-item v-for="(item,index) in content" :key="index" :content="item"></info-item>
  </div>
</template>

<script>
import infoItem from "./infoItem";
import localMusic from "../Nedb/localMusic";
import { message } from "../utils/utils";
const { dialog } = require("electron").remote;
const path = require("path");
import localSetting from "../Nedb/setting";
const { ipcRenderer: ipc } = require("electron");
export default {
  name: "",
  components: {
    infoItem,
  },
  data() {
    return {
      content: [
        { name: "我的歌单", list: true },
        { name: "我的收藏", list: false },
      ],
      LocalMusic: [],
      localList: null,
    };
  },
  computed: {
    msg() {
      if (this.musicListLen !== 0) {
        return "本地歌曲";
      } else {
        return "导入本地歌曲";
      }
    },
    musicListLen() {
      return this.$store.state.musicList.length;
    },
  },
  mounted() {
    this.$bus.$on("importLocalMusic", this.importMusicFn);
  },
  methods: {
    importMusic() {
      if (this.musicListLen === 0){
        this.importMusicFn();
      }else{
        this.getLocalMusic();
      }
      
      if (this.$route.path !== "/musicList") {
        this.$router.replace("/musicList");
      }
    },
    importMusicFn() {
      dialog
        .showOpenDialog({
          filters: [{ name: "music", extensions: ["mp3", "m4a", "flac"] }],
          properties: ["openFile", "multiSelections"],
        })
        .then((res) => {
          if (res.canceled) return;
          this.LocalMusic = res.filePaths.map((item, index) => {
            let music = {};
            music.index = this.musicListLen || index;
            music.path = item.replace(/\\/g, "/");
            music.name = path.basename(item).replace(/\.mp3/g, "");
            music.type = "local";
            return music;
          });
          if (this.musicListLen !== 0) {
            let music = [];
            this.LocalMusic.forEach((item) => {
              localMusic.find({ name: item.name }).then((res) => {
                if (res.length === 0) {
                  music.push(item);
                }
              });
            });
            this.LocalMusic = music;
            localMusic
              .insert(this.LocalMusic)
              .then((res) => {
                message("success", "歌曲导入成功");
                this.getLocalMusic();
              })
              .catch((err) => {
                message("error", "歌曲导入失败");
              });
          } else {
            localMusic
              .insert(this.LocalMusic)
              .then((res) => {
                message("success", "歌曲导入成功");
                this.getLocalMusic();
              })
              .catch((err) => {
                message("error", "歌曲导入失败");
              });
          }
        });
    },
    getLocalMusic() {
      this.$store.commit("clearMusicList")
      localMusic.find().then((res) => {
        if (res.length !== 0) {
          this.$store.commit("addMusic", res);
        }
      });
    },
  },
};
</script>
<style scoped>
.info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 150px;
  width: 100%;
  margin-top: 120px;
}
.info .el-button {
  width: 100px;
  margin: 0 auto;
  color: #fff;
  background: none;
}

.info .childInfo {
  padding: 12px 10px;
}

.info .el-button + .info .el-button {
  margin: 0px auto;
}
</style>