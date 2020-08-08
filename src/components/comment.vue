<template>
  <div class="comment">
    <div class="tab">
      <h3 style="color:#fff;">评论</h3>
      <mu-divider></mu-divider>
    </div>
    <div class="sentComment">
      <el-row :gutter="20">
        <el-col :span="20">
          <el-input placeholder="请输入评论" v-model="comment" size="small"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button round size="small" @click.native="sentComment">发送评论</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="showComments">
      <mu-list textline="two-line" v-if="comments.total!==0">
        <mu-list-item avatar v-for="item in comments.comments" :key="item.commentId">
          <mu-list-item-action>
            <mu-avatar>
              <img :src="item.user.avatarUrl">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <p>
              <span class="nickName">{{item.user.nickname+":"}}</span><span class="content">{{item.content}}</span>
            </p>
            <div class="date">
              <p>{{commentTime(item.time)}}</p>
              <p @click="delComment" v-if="item.user.userId===profile.userId" class="delComment">删除</p>
            </div>
          </mu-list-item-content>
        </mu-list-item>
      </mu-list>
      <mu-list v-else>
        <mu-list-item>
          <p class="content">暂无评论~</p>
        </mu-list-item>
      </mu-list>
    </div>
  </div>
</template>

<script>
import {operateComments} from "../netWork/request"
import moment from "moment"
export default {
  name: "comment",
  components: {},
  data() {
    return {
      comment: ""
    };
  },
  computed:{
    comments(){
      return this.$store.state.musicComments;
    },
    commentTime(){
      return (arg)=>{
        let dateStr=moment(arg).format(),
            reg=/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/,
            date=reg.exec(dateStr);
        return date[1]+"年"+date[2]+"月"+date[3]+"日  "+date[4]+":"+date[4]
      }
    },
    profile(){
      console.log(this.$store.state.userInfo);
      return this.$store.state.userInfo;
    }
  },
  methods:{
    async sentComment(){
      let params={};
      params.t=1;
      params.type=0;
      params.id=this.$store.state.musicInfo.id;
      params.content=this.comment;
      let opComment=new operateComments(params);
      let res=await opComment.addComment();
      console.log(res);
    },
    async delComment(){
      let params={};
      params.t=0;
      params.type=0;
      let opComment=new operateComments(params);
      let res=await opComment.delComment();
      console.log(res);
    }
  }
};
</script>
<style>
.comment .mu-divider {
  background-color: #fff;
}
.comment .sentComment {
  margin-top: 20px;
}
.comment .nickName{
  color: #67b3e0;
  display: inline-block;
  margin-right: 10px;
}
.comment .content{
  color: #fff;
}
.comment .date{
  color: #aeaeae;
  font-size: 12px;
  margin-top: 5px;
  display: flex;
  justify-content:space-between
}
.comment .mu-list li{
  border-bottom: 1px solid #ffffff;
  padding: 10px 0;
}
.comment .mu-item,.comment .mu-item.has-avatar,.comment .mu-list-two-line .mu-item{
  height: auto;
}
.comment .delComment{
  cursor: pointer;
}
</style>