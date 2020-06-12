<template>
  <div class="loginArea">
    <div class="icon">
      <img :src="src" alt="头像" class="avatar"/>
    </div>
    <div class="operate" v-if="operate">
      <el-button round size="small" @click="signIn">登录</el-button>
    </div>
    <div class="nickname" v-else>{{nickname}}</div>
    <sign-in-form :dialogVisible="dialogVisible" @close="close" @sendData="getData"></sign-in-form>
  </div>
</template>

<script>
let src = require("../assets/img/icon.svg");
import signInForm from "./signInForm"
export default {
  name: "login",
  components: {
    signInForm
  },
  data() {
    return {
      src: src,
      dialogVisible:false,
      operate:true,
      nickname:""
    };
  },
  methods:{
    signIn(){
      this.dialogVisible = true;
    },
    close(){
      this.dialogVisible=false;
    },
    getData(param){
      this.operate=false;
      this.src=param.avatarUrl;
      this.nickname=param.nickname;
    }
  }
};
</script>
<style scoped>
.loginArea {
  width: 100%;
  margin: 0 auto;
  margin-top: 60px;
  text-align: center;
}
.operate{
  margin-top: 5px;
  cursor: pointer;
  color: #fff;
}
.signIn:hover{
  color:#ff0000;
}
.dialog-footer{
  display: flex;
  justify-content:center;
}
.icon,.icon .avatar{
  width: 64px;
  height: 64px;
  border-radius: 50%;
}
.icon{
  margin: 0 auto;
}
.nickname{
  text-align: center;
  margin-top: 10px;
  color: #fff;
  letter-spacing: 3px;
}
.el-button--small, .el-button--small.is-round{
  padding: 6px 15px;
}
</style>