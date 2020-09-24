import db from "../Nedb/Nedb"
import localMusic from "../Nedb/localMusic"
import localSetting from "../Nedb/setting"
import { message } from "../utils/utils"
//import { decode } from "../utils/encode"
const { ipcRenderer: ipc } = require("electron");
const mounted = {
  mounted() {
    localSetting.find({ name: { $exists: true }, }).then(res=>{
      this.$store.commit("addPlayInfo",res[0]);
    })
    localSetting.find({ currentTime: { $exists: true }, duration: { $exists: true }, }).then(res=>{
      if(res.length===0){
        res[0]={ currentTime:0, duration:0};
      }
      this.$store.commit("setMusicTime",res[0]);
    })
    localSetting.find({ micLisSta: /[a-zA-Z]+/ }).then(
      doc => {
        if (doc.length === 0) {//设定一些默认配置
          localSetting.insert({ micLisSta: "localMusic" });
        }
        db.localMusic.loadDatabase((err) => {
          if(err!==null){
            message("error","本地数据库加载出错，请联系开发者");
            return ;
          }
        })
        this.getLocalMusic();
      }, err => {
        message("error", err);
      });
    ipc.on("close", async (arg) => {
      let musicInfo=await localSetting.find({name: { $exists: true }, });
      (async (resolve,reject)=>{
        if (musicInfo.length === 0) {
          await localSetting.insert([this.$store.state.musicInfo, this.$store.state.musicTime]);
          ipc.send("closed");
        } else {
          let time = await localSetting.find({ currentTime: { $exists: true }, duration: { $exists: true }, })
          delete this.$store.state.musicInfo._id;
          delete this.$store.state.musicTime._id;
          await localSetting.update(musicInfo[0], this.$store.state.musicInfo);
          await localSetting.update(time[0], this.$store.state.musicTime);
          ipc.send("closed");
        }
      })()
      
    })
  },
  methods: {
    getLocalMusic() {
      localMusic.find().then(res => {
        if (res.length !== 0) {
          this.$store.commit("addMusic", res);
        }
      })
    }
  }
}
export default mounted;