<template>
  <div class="info">
    <el-button class="childInfo" @click="importMusic">{{msg}}</el-button>
    <info-item v-for="(item,index) in content" :key="index" :content="item" ></info-item>
  </div>
</template>

<script>
import infoItem from "./infoItem"
const { dialog } = require("electron").remote;
const path = require("path");
export default {
  name: "",
  components: {
    infoItem
  },
  data() {
    return {
      flag: false,
      content:[
        {name:"我的歌单",list:true},
        {name:"我的收藏",list:false}
      ],
      LocalMusic: []
    };
  },
  computed: {
    msg() {
      if (this.flag) {
        return "本地歌曲";
      } else {
        return "导入本地歌曲";
      }
    }
  },
  methods: {
    importMusic() {
      dialog
        .showOpenDialog({
          filters: [{ name: "music", extensions: ["mp3", "m4a", "flac"] }],
          properties: ["openFile", "multiSelections"]
        })
        .then(res => {
          this.LocalMusic = res.filePaths.map((item,index) => {
            let music={};
            music.id=index;
            music.path=item.replace(/\\/g, "/");
            music.name=path.basename(item).replace(/\.mp3/g, "");
            return music;
          });
          this.$store.commit("addMusic", this.LocalMusic);
        });
    },
  }
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