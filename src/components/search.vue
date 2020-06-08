<template>
  <div class="search">
    <el-input v-model="music" :clearable="true" @input="searchTips">
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
    <!-- <div class="suggest">
      <mu-list>
        <mu-sub-header>
          <i class="icon" style>
          </i> 专辑
        </mu-sub-header>
        <mu-divider></mu-divider>
        <mu-list-item button :ripple="false">
          <mu-list-item-title>Stared</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button :ripple="false">
          <mu-list-item-title>Stared</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button :ripple="false">
          <mu-list-item-title>Stared</mu-list-item-title>
        </mu-list-item>
        <mu-divider></mu-divider>
      </mu-list>
      <mu-list>
        <mu-sub-header>专辑</mu-sub-header>
        <mu-divider></mu-divider>
        <mu-list-item button :ripple="false">
          <mu-list-item-title>Stared</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button :ripple="false">
          <mu-list-item-title>Stared</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button :ripple="false">
          <mu-list-item-title>Stared</mu-list-item-title>
        </mu-list-item>
        <mu-divider></mu-divider>
      </mu-list>
      <mu-list>
        <mu-sub-header>专辑</mu-sub-header>
        <mu-divider></mu-divider>
        <mu-list-item button :ripple="false">
          <mu-list-item-title>Stared</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button :ripple="false">
          <mu-list-item-title>Stared</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button :ripple="false">
          <mu-list-item-title>Stared</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </div>-->
    <search-sug :suggestItem="suggestItem" v-if="showSugg"></search-sug>
  </div>
</template>

<script>
import { searchMusic, searchSuggest } from "../netWork/request";
import searchSug from "./searchSug";
export default {
  name: "search",
  data() {
    return {
      music: "",
      suggest: {},
      showSugg:false
    };
  },
  computed: {
    suggestItem() {
      return [
        { title: "专辑", icon: "album.svg", category: "albums" },
        { title: "艺术家", icon: "artist.svg", category: "artists" },
        { title: "MV", icon: "video.svg", category: "mvs" }
      ];
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
      if (!this.music) {
        this.showSugg=false;
      }else{
        searchSuggest(this.music).then(res => {
          this.suggest = res.data.result;
          this.$store.commit("showSuggest", this.suggest);
          this.showSugg=true;
          // this.suggest.albums.forEach(item => {
          //   (item.name + item.artist.name).replace(
          //     this.music,
          //     `<span style="color:red">this.music</span>`
          //   );
          // });
        });
      }
    }
  }
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