<template>
  <div class="musicList">
    <mu-data-table :columns="columns" :data="this.$store.state.musicList" :min-col-width="60">
      <template slot-scope="scope">
        <td>{{scope.$index+1}}</td>
        <td @click="play(scope.row)">
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
  methods: {
    async play(arg) {
      if (!arg.path) {
        let musicInfo = {},
          musicUrl = await getmusicUrl(arg.id),
          picUrl = await getmusicDetails(arg.id);
        musicInfo.id = arg.id;
        musicInfo.name = arg.name;
        musicInfo.url = musicUrl.data.data[0].url;
        musicInfo.picUrl=picUrl.data.songs[0].al.picUrl;
        this.$store.commit("addPlayInfo",musicInfo);
        console.log(musicInfo);
        musicInfo=null;
      } else {
        this.$store.commit("addPlayInfo", arg);
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