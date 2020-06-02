<template>
    <div class="info">
      <el-button class="childInfo" @click="importMusic">{{msg}}</el-button>
      <el-button v-for="(item,index) in content" :key="index">{{item}}</el-button>
    </div> 
</template>

<script>
const {dialog}=require("electron").remote;
const path=require("path")
export default { 
  name:"",
  components: {},
  data() {
    return {
      flag:false,
      content:["我的歌单","我的收藏"],
      path:[],
      musicName:[]
    };
  },
  computed:{
    msg(){
      if(this.flag){
        return "本地歌曲"
      }else{
        return "导入本地歌曲";
      }
    }
  },
  methods:{
    importMusic(){
      dialog.showOpenDialog({
        filters:[{name:"music",extensions:["mp3","m4a","flac"]}],
        properties:[ 'openFile',  'multiSelections' ]
      }).then(res=>{
        this.path=res.filePaths.map(index=>index.replace(/\\/g,"/"));
        this.$store.commit('addPath', this.path)
        this.musicName=this.path.map(index=>{
          return path.basename(index).replace(/\.mp3/g,"")
        })
        this.$store.commit('addMusicName', this.musicName)
      })
    }
  } 
}
</script>
<style scoped>
.info{
  display: flex;
  flex-direction: column;
  justify-content:space-between;
  height: 150px;
  width: 100%;
  margin-top: 120px;
}
.el-button{
  width: 100px;
  margin: 0 auto;
  color: #fff;
  background: none;
}
.childInfo{
  padding: 12px 10px;
}

.el-button+.el-button{
  margin: 0px auto;
}
.audio{
  display: inline !important;
}
</style>