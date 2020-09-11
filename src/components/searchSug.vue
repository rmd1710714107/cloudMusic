<template>
  <div class="suggest">
    <div v-for="(item,index) in suggestItem" :key="index">
      <mu-list v-if="$store.state.suggest[item.category]">
        <mu-sub-header>
          <i
            class="icon"
            :style="{background:'url('+require('../assets/img/'+item.icon)+') no-repeat'}"
          ></i>
          <span class="headTitle">{{item.title}}</span>
        </mu-sub-header>
        <mu-divider></mu-divider>
        <mu-list-item
          button
          :ripple="false"
          v-for="(childItem) in $store.state.suggest[item.category]"
          :key="childItem.id"
          @click.native="selectedMusic(item.category,childItem)"
        >
          <loop-scroll :content="childItem" :searVal="searVal"></loop-scroll>
        </mu-list-item>
      </mu-list>
    </div>
  </div>
</template>

<script>
import loopScroll from "./loopScroll";
import {
  getmusicUrl,
  getmusicDetails,
  getAlbumContent,
  getArtistContent,
  getVideoContent
} from "../netWork/request";
export default {
  name: "searchSug",
  components: {
    loopScroll
  },
  props: {
    suggestItem: {
      type: Array,
      default() {
        return [];
      }
    },
    searVal:{
      type:String,
      default(){
        return ""
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    selectedMusic(type, data) {
      switch (type) {
        case "songs":
          (async () => {
            let musicInfo = {},
              musicUrl = await getmusicUrl(data.id),
              picUrl = await getmusicDetails(data.id);
            musicInfo.id = data.id;
            musicInfo.name = data.name;
            musicInfo.url = musicUrl.data.data[0].url;
            musicInfo.picUrl = picUrl.data.songs[0].al.picUrl;
            this.$store.commit("addPlayInfo", musicInfo);
            console.log(musicInfo);
            musicInfo = null;
          })();
          break;
        case "albums":
          (async () => {
            let res = await getAlbumContent(data.id);
            this.$store.commit("addMusic", res.data.songs);
            this.$router.replace('/musicList');
          })();
          break;
        case "artists":
          (async () => {
            let res = await getArtistContent(data.id);
            this.$store.commit("addMusic", res.data.hotSongs);
            this.$router.replace('/musicList');
          })();
          break;
        default:
          async () => {
            let res = await getVideoContent(data.id);
            this.$confirm("是否使用默认浏览器观看视频", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "info"
            })
              .then(() => {
                shell.openExternal(res.data.urls[0].url);
              })
              .catch(() => {
                console.log("已取消");
              });
          };
          break;
      }
      this.$emit("closeSugg")
    }
  }
};
</script>
<style>
.suggest {
  position: relative;
  z-index: 992;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  width: 240px;
}
.suggest .mu-sub-header {
  font-size: 12px;
  padding-left: 8px;
  padding-bottom: 4px;
  padding-top: 4px;
  height: 24px;
  line-height: inherit;
}
.suggest .mu-list {
  padding-bottom: 0px;
}
.suggest .mu-item {
  padding: 0 0 0 15px;
  height: 30px;
}
.suggest .icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 3px;
}
.suggest .icon,
.suggest .headTitle {
  vertical-align: middle;
}
.suggest .mu-item-wrapper {
  border-bottom: rgba(0, 0, 0, 0.12) solid 1px;
}
</style>