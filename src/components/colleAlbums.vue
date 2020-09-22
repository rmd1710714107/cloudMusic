<template>
<!-- 收藏的专辑 -->
  <div class="albums">
    <div class="head">
      <p class="title" style="font-size:20px;">
        收藏的专辑
        <span style="font-size:initial;">{{'('+(albumList.data?albumList.data.count:0)+')'}}</span>
      </p>
      <div class="search">
        <el-input placeholder="搜索我收藏的专辑" prefix-icon="el-icon-search" v-model="input2"></el-input>
      </div>
    </div>
    <mu-divider></mu-divider>
    <scroll :height="listHeight+'px'">
      <mu-list>
        <mu-list-item
          button
          :ripple="false"
          v-for="item in (albumList.data?albumList.data.data:[])"
          :key="item.id"
          @click="getAlbumContent(item.id)"
        >
          <mu-list-item-action>
            <div class="albImg">
              <img class="img" :src="item.picUrl" />
            </div>
          </mu-list-item-action>
          <mu-list-item-content>{{item.name}}</mu-list-item-content>
          <mu-list-item-content>
            <p class="p">{{item.artists[0].name}}</p>
          </mu-list-item-content>
          <mu-list-item-content>
            <p class="p">{{item.size+"首"}}</p>
          </mu-list-item-content>
        </mu-list-item>
      </mu-list>
    </scroll>
  </div>
</template>

<script>
import { getAlbumList, getAlbumContent } from "../netWork/request";
import scroll from "./scroll";
import {message} from "../utils/utils"
export default {
  name: "albums",
  components: {
    scroll
  },
  created() {
    (async () => {
      this.albumList = await getAlbumList();
      if(this.albumList.data.code!==200){
        message("error","获取专辑列表出错");
        return;
      }
    })();
    this.$nextTick(() => {
      this.listHeight = document.documentElement.clientHeight - 30 - 151;
    });
  },
  mounted() {
    this.$bus.$on("listHeight", (arg) => {
      this.listHeight = arg - 171;
    });
  },
  data() {
    return {
      albumList: {},
      input2: "",
      listHeight: 1000,
    };
  },
  methods: {
    async getAlbumContent(id) {
      let res = await getAlbumContent(id);
      if(res.data.cod!==200){
        message("error","获取专辑歌曲出错");
        return;
      }
      this.$store.commit("addMusic", res.data.songs);
      this.$router.replace("/musicList");
    },
  },
  computed: {
    albumData() {
      return this.albumList || "未知";
    },
  },
};
</script>
<style>
.albums .head {
  width: calc(100% - 40px);
  padding: 0 20px;
  display: flex;
  margin: 0px;
  justify-content: space-between;
  box-sizing: content-box;
  height: 30px;
}
.albums .search {
  width: 200px;
  height: 30px;
  margin: 0;
}
.albums .el-input__icon {
  height: 25px;
  line-height: 25px;
}
.albums .albImg,
.albums .img {
  width: 48px;
  height: 40px;
}
.albums .mu-list .p {
  text-align: center;
  width: 100%;
}
.albums .mu-list .mu-item-content {
  flex: 1 1 auto;
}
</style>