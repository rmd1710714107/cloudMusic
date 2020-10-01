<template>
  <!-- 搜索组件 -->
  <div class="search">
    <el-input v-model="music" :clearable="true" @input="searchTips">
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
    <search-sug
      :suggestItem="suggestItem"
      v-if="showSugg"
      @closeSugg="showSugg = false"
      :searVal="music"
    ></search-sug>
  </div>
</template>

<script>
import { searchMusic, searchSuggest } from "../netWork/request";
import searchSug from "./searchSug";
import { debounce, message } from "../utils/utils";
export default {
  name: "search",
  data() {
    return {
      music: "",
      suggest: {},
      showSugg: false,
      offset:0,
      count:0
    };
  },
  mounted(){
    this.$bus.$on("refresh",this.refresh);
  },
  computed: {
    suggestItem() {
      if (JSON.stringify(this.suggest) === "{}") {
        return [{ name: "请输入正确的信息" }];
      } else {
        return [
          { title: "歌曲", icon: "songs.svg", category: "songs" },
          { title: "专辑", icon: "album.svg", category: "albums" },
          { title: "艺术家", icon: "artist.svg", category: "artists" },
          { title: "MV", icon: "video.svg", category: "mvs" },
        ];
      }
    },
    isSearch(){
      if(this.music===""){
        return false;
      }else{
        return true;
      }
    }
  },
  components: {
    searchSug,
  },
  methods: {
    async search() {
      if(!this.isSearch) return;
      let res = await searchMusic(this.music);
      this.$store.commit("saveSearchKey",{params:this.music});
      if (res.data.code !== 200) {
        message("error", "程序出错，请联系开发者");
        return;
      }
      this.showSugg = false;
      this.count=res.data.result.songCount;
      this.$store.commit("clearMusicList");
      this.$store.commit("addMusic", res.data.result.songs);
      this.music=""
    },
    searchTips() {
      debounce(async () => {
        if(!this.isSearch) return
          let res=await searchSuggest(this.music)
          if (!res.data) return;
          if (res.data.code !== 200) {
            message("error", "程序出错，请联系开发者");
          }
          this.suggest = res.data.result;
          await this.$store.commit("showSuggest", this.suggest);
          this.showSugg = true;
      }, 2000)();
      this.showSugg = false;
    },
    async refresh(arg){
      if(this.count===0) return;
      if(this.offset>=(this.count-100)){
        message("info","没有更多歌曲了",true)
        return;
      };
      this.offset+=100;
      let res = await searchMusic(this.$store.state.searchKey.params,this.offset);
      console.log(this.offset,res);
      this.$store.commit("addMusic", res.data.result.songs);
    }
  },
};
</script>
<style>
.search {
  height: 30px;
  margin-right: 60px;
}
.search .el-input {
  height: 25px;
  margin: 2.5px 0;
}
.search .el-input__inner {
  height: 25px;
  line-height: 25px;
}
.search .el-input-group__append {
  padding: 0 6px;
}
</style>