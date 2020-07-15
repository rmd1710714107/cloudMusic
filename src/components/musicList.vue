<template>
  <div class="musicList">
    <mu-data-table :columns="columns" :data="this.$store.state.musicList" :min-col-width="60" height="300">
      <template slot-scope="scope">
        <td>{{scope.$index+1}}</td>
        <td @click="play(scope.$index)">
          <loop-scroll :content="scope.row" :exam="false"></loop-scroll>
        </td>
        <td>{{"未知"}}</td>
        <td>{{"未知"}}</td>
        <td>{{"未知"}}</td>
      </template>
    </mu-data-table>
  </div>
</template>

<script>
import loopScroll from "./loopScroll";
import { getmusicUrl, getmusicDetails } from "../netWork/request";
export default {
  name: "musicList",
  components: {
    loopScroll
  },
  data() {
    return {
      sort: {
        name: "",
        order: "asc"
      },
      selects: [],
      columns: [
        { title: "", name: "name", align: "center" },
        { title: "歌曲", name: "calories", width: 200, align: "center" },
        { title: "歌手", name: "fat", align: "center" },
        { title: "专辑", name: "carbs", align: "center" },
        { title: "时长", name: "protein", align: "center" }
      ]
    };
  },
  mounted(){
    this.$bus.$on("switchSong",type=>{
      switch (type) {
        case "prevMusic":
          // if(this.$store.state.musicList[this.$store.state.musicInfo.index-1]){
          //   this.play(this.$store.state.musicInfo.index-1)
          // }else{
            
          // }
          break;
        default:
          this.$bus.$emit("switchSong",type)
          break;
      }
    })
  },
  methods: {
    async play(arg) {
      let music=this.$store.state.musicList[arg];
      if (!music.path) {
        let musicInfo = {},
          musicUrl = await getmusicUrl(music.id),
          picUrl = await getmusicDetails(music.id);
        musicInfo.id = music.id;
        musicInfo.name = music.name;
        musicInfo.url = musicUrl.data.data[0].url;
        musicInfo.picUrl=picUrl.data.songs[0].al.picUrl;
        musicInfo.index=arg;
        this.$store.commit("addPlayInfo",musicInfo);
        musicInfo=null;
      } else {
        this.$store.commit("addPlayInfo", music);
      }
    }
  }
};
</script>
<style>
.musicList .mu-table td {
  text-align: center;
}
.musicList .mu-table th,
.musicList .mu-table td {
  padding: 1px 14px;
}
.musicList .mu-table td {
  height: 48px;
}
.musicList .mu-checkbox {
  width: 24px;
  margin: 0 auto;
  display: block;
}
</style>