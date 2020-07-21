import db from "../Nedb/Nedb"
import localMusic from "../Nedb/localMusic"
import localSetting from "../Nedb/setting"
import { message } from "../utils/utils"
//import { decode } from "../utils/encode"
const { ipcRenderer: ipc } = require("electron");
const mounted = {
  mounted() {
    //localSetting.remove({phone:{$exists:true},pwd:{$exists:true}});
    // localSetting.find({phone:{$exists:true},pwd:{$exists:true}}).then(res=>{
    //   if(res.length===0){
    //     return
    //   }else{
    //     console.log(decode(res[0].pwd));
    //     let form={};
    //     form.phone=res[0].phone;
    //     form.pwd=decode(res[0].pwd)
    //     this.$bus.$emit("autoSign",form);
    //     form=null;
    //   }
    // })
    localSetting.find({ index: { $exists: true }, name: { $exists: true }, }).then(res=>{
      console.log(res);
      this.$store.commit("addPlayInfo",res[0]);
    })
    localSetting.find({ currentTime: { $exists: true }, duration: { $exists: true }, }).then(res=>{
      console.log(res);
      this.$store.commit("setMusicTime",res[0]);
    })
    localSetting.find({ micLisSta: /[a-zA-Z]+/ }).then(
      doc => {
        if (doc.length === 0) {//设定一些默认配置
          localSetting.insert({ micLisSta: "localMusic" });
        }
        if (doc[0].micLisSta === "localMusic") {
          db.localMusic.loadDatabase((err) => {
          })
          this.update.localMusic = this.getLocalMusic;
          this.getLocalMusic();
        }
      }, err => {
        message("error", err);
      });
    ipc.on("close", async (arg) => {
      let musicInfo=await localSetting.find({ index: { $exists: true }, name: { $exists: true }, });
      (async ()=>{
        if (musicInfo.length === 0) {
          localSetting.insert([this.$store.state.musicInfo, this.$store.state.musicTime]);
        } else {
          let time = await localSetting.find({ currentTime: { $exists: true }, duration: { $exists: true }, })
          delete this.$store.state.musicInfo._id
          delete this.$store.state.musicTime._id
          localSetting.update(musicInfo[0], this.$store.state.musicInfo)
          localSetting.update(time[0], this.$store.state.musicTime)
          console.log("update");
        }
      })();
      console.log("close");
      ipc.send("closed");

    })

  },
  methods: {
    getLocalMusic() {
      localMusic.find().then(res => {
        //console.log(res);
        if (res.length !== 0) {
          this.$store.commit("addMusic", res);
        }
      })
    }
  }
}
export default mounted;