<template>
  <div class="videos">
    <div class="head">
      <p class="title" style="font-size:20px;">
        收藏的视频
        <span style="font-size:initial;">{{'('+(MvList.data?MvList.data.count:0)+')'}}</span>
      </p>
      <div class="search">
        <el-input placeholder="搜索我收藏的视频" prefix-icon="el-icon-search" v-model="input2"></el-input>
      </div>
    </div>
    <mu-divider></mu-divider>
    <div class="content">
      <el-row :gutter="20">
        <el-col
          :lg="4"
          :md="6"
          :xs="12"
          :sm="8"
          v-for="item in (MvList.data?MvList.data.data:[])"
          :key="item.vid"
        >
          <el-card :body-style="{ padding: '0px' }" @click.native="playVideo(item.vid)">
            <div class="cover">
              <img :src="item.coverUrl" class="image" />
              <p class="playTime">
                <img
                  src="../assets/img/mv.svg"
                  style="width:20px;height:20px;vertical-align:middle;margin-right:3px;"
                />
                {{item.playTime}}
              </p>
              <p class="duration">{{duration(item.durationms)}}</p>
            </div>
            <div style="padding: 14px;">
              <span class="mvTitle">{{item.title}}</span>
              <div class="bottom clearfix">
                <p class="time">by{{ item.creator[0].userName}}</p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getMvList, getVideoContent } from "../netWork/request";
import { handleMusicTinme } from "../utils/utils";
const { shell: shell } = require("electron");
export default {
  name: "videos",
  components: {},
  created() {
    (async () => {
      this.MvList = await getMvList();
      console.log(this.MvList);
    })();
  },
  data() {
    return {
      MvList: {},
      input2: "",
      centerDialogVisible:false,
      videoUrl:""
    };
  },
  computed: {
    duration() {
      return arg => {
        let time = handleMusicTinme(arg.toString().substring(0, 3));
        return time;
      };
    }
  },
  methods: {
    async playVideo(id) {
      let res = await getVideoContent(id);
      this.$confirm("是否打开浏览器观看视频",{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(()=>{
        shell.openExternal(res.data.urls[0].url);
      })
      
    }
  }
};
</script>
<style>
.videos .head {
  width: calc(100% - 40px);
  padding: 0 20px;
  display: flex;
  margin: 0px;
  justify-content: space-between;
  box-sizing: content-box;
  height: 30px;
}
.videos .search {
  width: 200px;
  height: 30px;
  margin: 0;
}
.videos .el-input__icon {
  height: 25px;
  line-height: 25px;
}
.videos .albImg,
.videos .img {
  width: 48px;
  height: 40px;
}
.videos .mu-list .p {
  text-align: center;
  width: 100%;
}
.videos .mu-list .mu-item-content {
  flex: 1 1 auto;
}

.videos .mvTitle,
.videos .bottom {
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
  width: 100%;
  overflow: hidden;
}
.videos .bottom {
  margin-top: 13px;
  line-height: 12px;
}

.videos .image {
  width: 100%;
  display: block;
}

.videos .clearfix:before,
.videos .clearfix:after {
  display: table;
  content: "";
}

.videos .clearfix:after {
  clear: both;
}
.videos .content {
  padding: 10px;
}
.videos .cover {
  position: relative;
}
.videos .el-col {
  margin-bottom: 10px;
  cursor: pointer;
}
.videos .playTime,
.videos .duration {
  position: absolute;
  color: #fff;
}
.videos .playTime {
  right: 3px;
  top: 0;
}
.videos .duration {
  left: 3px;
  bottom: 0;
}
</style>