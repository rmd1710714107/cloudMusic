<template>
  <div class="search">
    <el-input v-model="music" :clearable="true" @input="searchTips">
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
    <search-sug :suggestItem="suggestItem" v-if="showSugg" @closeSugg="showSugg = false" :searVal="music"></search-sug>
  </div>
</template>

<script>
import { searchMusic, searchSuggest } from "../netWork/request";
import searchSug from "./searchSug";
import { debounce } from "../utils/utils";
export default {
  name: "search",
  data() {
    return {
      music: "",
      suggest: {},
      showSugg: false
    };
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
          { title: "MV", icon: "video.svg", category: "mvs" }
        ];
      }
    }
  },
  components: {
    searchSug
  },
  methods: {
    search() {
      searchMusic(this.music).then(res => {});
    },
    searchTips() {
      if (this.music) {
        debounce(() => {
          searchSuggest(this.music).then(res => {
            if (!res.data) return;
            this.suggest = res.data.result;
            this.$store.commit("showSuggest", this.suggest);
            this.showSugg = true;
          });
        }, 2000)();
      }
      this.showSugg = false;
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