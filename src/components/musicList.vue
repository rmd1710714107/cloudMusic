<template>
  <div class="musicList">
    <el-row v-if="musicList">
      <el-col :span="6">
        <el-button size="mini" @click="importLocalMusic">导入本地歌曲</el-button>
      </el-col>
      <el-col :span="6" :offset="12">
        <el-input
          v-model="musicKey"
          placeholder="搜索本地歌曲"
          size="mini"
          prefix-icon="el-icon-search"
          @keyup.enter.native="search"
          @input="search"
        ></el-input>
      </el-col>
    </el-row>
    <scroll :height="listHeight+'px'">
        <mu-data-table
        :columns="columns"
        :data="searRes.length===0?musicList:searRes"
        :min-col-width="60"
        ref="table"
      >
        <template slot-scope="scope">
          <td>{{scope.$index+1}}</td>
          <td @click="play(scope.$index)">
            <loop-scroll :content="scope.row" :searVal="musicKey"></loop-scroll>
          </td>
          <td>{{scope.row.ar?scope.row.ar[0].name:"未知"}}</td>
          <td class="album">{{scope.row.al?scope.row.al.name:"未知"}}</td>
        </template>
      </mu-data-table>
      
    </scroll>
  </div>
</template>

<script>
import loopScroll from "./loopScroll";
import { getmusicUrl, getmusicDetails } from "../netWork/request";
import Vue from "vue";
import { getLyric } from "../netWork/request";
import scroll from "./scroll";
import localMusic from "../Nedb/localMusic"
export default {
  name: "musicList",
  components: {
    loopScroll,
    scroll
  },
  data() {
    return {
      columns: [
        { title: "", name: "name", align: "center", width: 80 },
        { title: "歌曲", name: "calories", width: 300, align: "left" },
        { title: "歌手", name: "fat", align: "center" },
        { title: "专辑", name: "carbs", align: "center" },
      ],
      listHeight: 450,
      musicKey: "",
      sugArr: 0,
      searRes:[]
    };
  },
  mounted() {
    this.$bus.$on("switchSong", (musicIndex) => {
      this.play(musicIndex);
    });
    this.listHeight = this.$parent.$refs.main.offsetHeight - 70 - 35;
    this.$bus.$on("listHeight", (arg) => {
      this.listHeight = arg - 70 - 35;
    });
  },
  methods: {
    async play(arg) {
      let music = this.$store.state.musicList[arg];
      if (!music.path) {
        let musicInfo = {},
          musicUrl = await getmusicUrl(music.id),
          picUrl = await getmusicDetails(music.id);
        musicInfo.id = music.id;
        musicInfo.name = music.name;
        musicInfo.url = musicUrl.data.data[0].url;
        musicInfo.picUrl = picUrl.data.songs[0].al.picUrl;
        musicInfo.index = arg;
        this.$store.commit("addPlayInfo", musicInfo);
        musicInfo = null;
      } else {
        music.index = arg;
        this.$store.commit("addPlayInfo", music);
      }
      this.$store.commit("setMusicTime", {});
    },
    importLocalMusic() {
      this.$bus.$emit("importLocalMusic",false);
    },
    search(){
      if(this.musicKey==="") this.searRes=[];
      localMusic.find({name:new RegExp(this.musicKey, "g")}).then(res=>{
        this.searRes=res;
      })
    }
  },
  computed: {
    musicList() {
      return this.$store.state.musicList;
    },
  }
};
</script>
<style>
.musicList {
  height: auto;
  overflow-x: hidden;
}
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
.musicList .album {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.musicList tr {
  max-height: 48px;
}
.musicList .mu-table .mu-table-body-wrapper tr {
  cursor: pointer;
}

.musicList .el-row {
  padding: 5px;
}
</style>