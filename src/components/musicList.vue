<template>
  <!-- 歌单列表组件 -->
  <div class="musicList">
    <el-row v-if="musicList.length !== 0">
      <el-col :span="6">
        <el-button size="mini" @click="importLocalMusic"
          >导入本地歌曲</el-button
        >
      </el-col>
      <el-col :span="6" :offset="12">
        <el-input
          v-model="musicKey"
          placeholder="搜索本地歌曲"
          size="mini"
          prefix-icon="el-icon-search"
          @input="search"
        ></el-input>
      </el-col>
    </el-row>
    <scroll :height="listHeight + 'px'" @pullDown="refresh">
      <template>
        <el-table :data="searRes.length === 0 ? musicList : searRes" style="width: 100%" :cell-class-name="cellClassName">
          <el-table-column type="index" width="80" align="center"></el-table-column>
          <el-table-column label="歌曲" width="300" align="left">
            <template slot-scope="scope">
              <loop-scroll :content="scope.row" :searVal="musicKey" @click.native="play(scope.$index)"></loop-scroll>
            </template>
          </el-table-column>
          <el-table-column label="歌手" align="center">
            <template slot-scope="scope">
              <el-tooltip v-if="scope.row.hasOwnProperty('artists')&&(scope.row.artists[0].name!==null)" :content="scope.row.artists[0].name" effect="dark" placement="top" :enterable="false">
                <p>{{scope.row.artists[0].name}}</p>
              </el-tooltip>
              <el-tooltip v-else-if="scope.row.hasOwnProperty('ar')&&(scope.row.ar[0].name!==null)"  :content="scope.row.ar[0].name" effect="dark" placement="top" :enterable="false">
                <p>{{scope.row.ar[0].name}}</p>
              </el-tooltip>
              <p v-else>未知</p>
            </template>
          </el-table-column>
          <el-table-column label="专辑" align="center">
            <template slot-scope="scope">
              <el-tooltip v-if="scope.row.hasOwnProperty('album')&&(scope.row.album.name!==null)" :content="scope.row.album.name" effect="dark" placement="top" :enterable="false">
                <p>{{scope.row.album.name}}</p>
              </el-tooltip>
              <el-tooltip v-else-if="scope.row.hasOwnProperty('al')&&(scope.row.al.name!==null)"  :content="scope.row.al.name" effect="dark" placement="top" :enterable="false">
                <p>{{scope.row.al.name}}</p>
              </el-tooltip>
              <p v-else>未知</p>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </scroll>
  </div>
</template>

<script>
import loopScroll from "./loopScroll";
import { getmusicUrl, getmusicDetails, checkMusic } from "../netWork/request";
import Vue from "vue";
import scroll from "./scroll";
import localMusic from "../Nedb/localMusic";
import { message,loading } from "../utils/utils";
export default {
  name: "musicList",
  components: {
    loopScroll,
    scroll,
  },
  data() {
    return {
      listHeight: 450,
      musicKey: "",
      sugArr: 0,
      searRes: [],
      hasRendered: true,
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
          checkRes = await checkMusic(music.id);
        if (!checkRes.data.success) {
          message("error", checkRes.data.message);
          return;
        }
        let musicUrl = await getmusicUrl(music.id),
          picUrl = await getmusicDetails(music.id);
        console.log(musicUrl);
        if (musicUrl.data.code !== 200) {
          message("error", "歌曲获取出错");
          return;
        }
        if (picUrl.data.code !== 200) {
          message("error", "歌曲图片获取出错");
          return;
        }
        switch (musicUrl.data.data[0].fee) {
          case 1:
            message("info", "VIP可听");
            return;
            break;
          case 4:
            message("info", "所在专辑需单独付费");
            return;
            break;
          default:
            musicInfo.url = musicUrl.data.data[0].url;
            break;
        }
        musicInfo.id = music.id;
        musicInfo.type = "online";
        musicInfo.name = music.name;
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
      this.$bus.$emit("importLocalMusic", false);
    },
    search() {
      if (this.musicKey === "") this.searRes = [];
      localMusic.find({ name: new RegExp(this.musicKey, "g") }).then((res) => {
        this.searRes = res;
      });
    },
    refresh() {
      this.$bus.$emit("refresh");
    },
    cellClassName({row, column, rowIndex, columnIndex}){
      if(columnIndex!==1){
        return "newCellStyle"
      }
    }
  },
  computed: {
    musicList() {
      return this.$store.state.musicList;
    },
  },
};
</script>
<style>
.musicList {
  height: 100%;
  overflow-x: hidden;
}
.musicList .el-table td {
  text-align: center;
}
.musicList .el-table th,
.musicList .el-table td {
  padding: 1px 14px;
}
.musicList .el-table .cell {
  height: 45px;
}

.musicList .album {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.musicList tr {
  max-height: 48px;
}
.musicList .el-table .el-table__body-wrapper .el-table__row {
  cursor: pointer;
}

.musicList .el-row {
  padding: 5px;
}
.newCellStyle .cell{
  display: flex;
  align-items: center;
  justify-content: center;
  
}
.newCellStyle .cell p{
  white-space: nowrap;
  text-overflow:ellipsis;
  overflow: hidden;
}

</style>