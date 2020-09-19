<template>
<!-- 登录区域 -->
  <div class="loginArea">
    <div class="icon">
      <img :src="proflie.avatarUrl||src" alt="头像" class="avatar"/>
    </div>
    <div class="operate" v-if="operate">
      <el-button round size="small" @click="signIn">登录</el-button>
    </div>
    <div class="nickname" v-else>{{proflie.nickname}}</div>
    <sign-in-form :dialogVisible="dialogVisible" @close="close" ></sign-in-form>
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
      src: require("../assets/img/icon.svg"),
      dialogVisible:false,
      operate:true,
    };
  },
  methods:{
    signIn(){
      this.dialogVisible = true;
    },
    close(){
      if(JSON.stringify(this.proflie)!=="{}"){
        this.operate=false;
      }
      this.dialogVisible=false;
    }
  },
  computed: {
    proflie(){
      return this.$store.state.userInfo;
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