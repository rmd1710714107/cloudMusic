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
    localSetting.find({ micLisSta: /[a-zA-Z]+/ }).then(
      doc => {
        //console.log(doc);
        if (doc.length === 0) {//设定一些默认配置
          localSetting.insert({ micLisSta: "localMusic" })
        }
        if (doc[0].micLisSta === "localMusic") {
          db.localMusic.loadDatabase((err) => {
            //console.log(err);
          })
          this.update.localMusic = this.getLocalMusic;
          this.getLocalMusic();
        } else {
          localSetting.find({ songMenuId: /[0-9]+/ }).then(res => {
            //this.update.getMusic(id)
          })
          //this.update.
        }
      }, err => {
        message("error", err);
      });
    // (async ()=>{
    //   let musicInfo=await localSetting.find({ index: { $exists: true }, name: { $exists: true }, }),
    //       time=await localSetting.find({ currentTime: { $exists: true }, duration: { $exists: true }, });
    //   this.$store.commit("setMusicTime", time[0]);
    //   this.$store.commit("addPlayInfo", musicInfo[0]);
    // })()
    // ipc.on("close", (res) => {
    //   // localSetting.update({ micLisSta: /[a-zA-Z]+/},{micLisSta:this.$store.state.micLisSta}).then(res=>{
    //   //   console.log(res+"条记录被影响");
    //   // })
    //   //console.log("ok");
    //   localSetting.find({ index: { $exists: true }, name: { $exists: true }, }).then(
    //     async (musicInfo) => {
    //       //console.log(res);
    //       if (musicInfo.length === 0) {
    //         localSetting.insert([this.$store.state.musicInfo, this.$store.state.musicTime]);
    //       } else {
    //         let time = await localSetting.find({ currentTime: { $exists: true }, duration: { $exists: true }, })
    //         localSetting.update(musicInfo[0],this.$store.state.musicInfo)
    //         localSetting.update(time[0],this.$store.state.musicTime)
    //         console.log("ok");
    //       }
    //     })
    // })
    //console.log("ok");

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