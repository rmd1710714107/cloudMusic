<template>
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
    infoItem
  },
  data() {
    return {
      flag: false,
      content: [
        { name: "我的歌单", list: true },
        { name: "我的收藏", list: false }
      ],
      LocalMusic: [],
      localList: null
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
  mounted(){
    localSetting.find({flag:{$exists:true}}).then(res=>{
      if(res.length===0){
        localSetting.insert({flag:this.flag});
      }else{
        this.flag=res[0].flag;
      }
    })
    // ipc.on("close",()=>{

    // })
  },
  methods: {
    importMusic() {
      if (this.flag) {
        this.update.localMusic();
      } else {
        dialog
          .showOpenDialog({
            filters: [{ name: "music", extensions: ["mp3", "m4a", "flac"] }],
            properties: ["openFile", "multiSelections"]
          })
          .then(res => {
            if(res.canceled) return;
            this.LocalMusic = res.filePaths.map((item, index) => {
              let music = {};
              music.index = this.$store.state.musicList.length || index;
              music.path = item.replace(/\\/g, "/");
              music.name = path.basename(item).replace(/\.mp3/g, "");
              return music;
            });
            if (this.$store.state.musicList.length !== 0) {
              this.LocalMusic.forEach(item => {
                console.log(item.name);
                localMusic.find({ name: item.name }).then(res => {
                  if (res.length!==0) {
                    message("info","此歌曲已导入")
                    return;
                  }else{
                    this.insertMusic(this.LocalMusic)
                  }
                });
              });
            }else{
              this.insertMusic(this.LocalMusic)
            }
            this.flag = !this.flag;
            localSetting.update({flag:!this.flag},{flag:this.flag}).then(res=>{
              console.log(res);
              message("info",res+"条记录被影响");
            })
          });
        
      }
      if(this.$route.path!=='/musicList'){
        this.$router.replace('/musicList');
      }
      localSetting.find({ micLisSta: "localMusic" }).then(
        doc => {
          if (doc.length === 0) {
            this.$store.commit("updateMicLisSta", "localMusic");
          }
        },
        err => {
          message("error", err);
        }
      );
    },
    insertMusic(data) {
      localMusic.insert(data).then(
        res => {
          message("success", "歌曲导入成功");
          this.update.localMusic();
          console.log(res);
        },
        err => {
          message("error", "歌曲导入失败");
        }
      );
    }
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