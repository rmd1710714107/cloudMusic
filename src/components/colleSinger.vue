<template>
  <div class="singer">
    <div class="head">
      <p class="title" style="font-size:20px;">
        收藏的歌手
        <span style="font-size:initial;">{{'('+(artistList.data?artistList.data.count:0)+')'}}</span>
      </p>
      <div class="search">
        <el-input placeholder="搜索我收藏的歌手" prefix-icon="el-icon-search" v-model="input2"></el-input>
      </div>
    </div>
    <mu-divider></mu-divider>
    <mu-list>
      <mu-list-item button :ripple="false" v-for="item in (artistList.data?artistList.data.data:[])" :key="item.id" @click="getArtistContent(item.id)">
        <mu-list-item-action>
          <div class="albImg">
            <img class="img" :src="item.picUrl" />
          </div>
        </mu-list-item-action>
        <mu-list-item-content>{{item.name}}</mu-list-item-content>
        <mu-list-item-content>
          <p class="p">专辑:{{item.albumSize}}首</p>
        </mu-list-item-content>
        <mu-list-item-content>
          <p class="p">{{'MV:'+item.mvSize+"首"}}</p>
        </mu-list-item-content>
      </mu-list-item>
    </mu-list>
  </div>
</template>

<script>
import { getArtistList,getArtistContent } from "../netWork/request";
export default {
  name: "singer",
  components: {},
  created () {
    (async ()=>{
      this.artistList = await getArtistList();
      console.log(this.artistList);
    })();
  },
  mounted() {
      console.log(this.artistList);
  },
  data() {
    return {
      artistList: {},
      input2: ""
    };
  },
  methods:{
    async getArtistContent(id){
      let res=await getArtistContent(id);
      this.$store.commit("addMusic", res.data.hotSongs);
      // let song=await getmusicUrl(res.data.songs[0].id)
      // console.log(song);
      this.$router.replace('/musicList');
      //console.log(res);
    }
  }
};
</script>
<style>
.singer .head {
  width: calc(100% - 40px);
  padding: 0 20px;
  display: flex;
  margin: 0px;
  justify-content: space-between;
  box-sizing: content-box;
  height: 30px;
}
.singer .search {
  width: 200px;
  height: 30px;
  margin: 0;
}
.singer .el-input__icon {
  height: 25px;
  line-height: 25px;
}
.singer .albImg, .singer .img{
  width: 48px;
  height: 40px;
}
.singer .mu-list .p{
  text-align: center;
  width: 100%;
}
.singer .mu-list .mu-item-content{
  flex:1 1 auto;
}
</style>