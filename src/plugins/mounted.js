import db from "../Nedb/Nedb"
import localMusic from "../Nedb/localMusic"
import localSetting from "../Nedb/setting"
import {message} from "../utils/utils"
const { ipcRenderer: ipc } = require("electron");
const mounted = {
  mounted() {
    localSetting.find({ micLisSta: /[a-zA-z]+/ }).then(doc=>{
      if (doc[0].micLisSta === "localMusic") {
        db.localMusic.loadDatabase((err)=>{
          console.log(err);
        })
        this.update.localMusic=this.getLocalMusic;
        this.getLocalMusic();
      }else{
        localSetting.find({songMenuId:/[0-9]+/}).then(res=>{
          //this.update.getMusic(id)
        })
        //this.update.
      }
      ipc.send("oldMicLisSta",doc[0].micLisSta)
      //this.$store.commit("updateMicLisSta", doc[0].micLisSta)
    },err=>{
      message("error",err);
    });
    ipc.on("close",(res)=>{
      
    })
    
  },
  methods:{
    getLocalMusic(){
      localMusic.find().then(res=>{
        console.log(res);
        if (res.length !== 0) {
          this.$store.commit("addMusic", res);
        }
      })
    }
  }
}
export default mounted;