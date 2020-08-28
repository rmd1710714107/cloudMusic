<template>
  <div class="musicList">
    <mu-data-table
      :columns="columns"
      :data="this.$store.state.musicList"
      :min-col-width="60"
      :max-height="listHeight"
      ref="table"
    >
      <template slot-scope="scope">
        <td>{{scope.$index+1}}</td>
        <td @click="play(scope.$index)">
          <loop-scroll :content="scope.row" :exam="false"></loop-scroll>
        </td>
        <td>{{scope.row.ar?scope.row.ar[0].name:"未知"}}</td>
        <td class="album">{{scope.row.al?scope.row.al.name:"未知"}}</td>
      </template>
    </mu-data-table>
  </div>
</template>

<script>
import loopScroll from "./loopScroll";
import { getmusicUrl, getmusicDetails } from "../netWork/request";
import Vue from "vue";
import Scrollbar from "smooth-scrollbar";
import { getLyric } from "../netWork/request";
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
        { title: "", name: "name", align: "center",width:80 },
        { title: "歌曲", name: "calories", width: 300, align: "left" },
        { title: "歌手", name: "fat", align: "center" },
        { title: "专辑", name: "carbs", align: "center" }
      ],
      listHeight: 450
    };
  },
  mounted() {
    this.$bus.$on("switchSong",musicIndex => {
      this.play(musicIndex);
      // switch (type) {
      //   case "prevMusic":
      //     // if(this.$store.state.musicList[this.$store.state.musicInfo.index-1]){
      //     //   this.play(this.$store.state.musicInfo.index-1)
      //     // }else{

      //     // }
      //     break;
      //   default:
      //     //this.$bus.$emit("switchSong",type)
      //     break;
      // }
    });
    this.listHeight = this.$parent.$refs.main.offsetHeight - 70;
    this.$bus.$on("listHeight", arg => {
      this.listHeight = arg - 70;
    });
  },
  updated() {
    if (document.querySelector(".mu-table-body-wrapper")) {
      Scrollbar.init(document.querySelector(".mu-table-body-wrapper"));
    }
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
        music.index=arg;
        this.$store.commit("addPlayInfo",music);
      }
      this.$store.commit("setMusicTime",{})
    }
  },
  computed: {
    tableHeight() {}
  }
};
</script>
<style>
.musicList {
  height: 100%;
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
</style>