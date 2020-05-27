<template>
  <div class="loginArea">
    <div class="icon">
      <img :src="src" alt="头像" />
      <!-- <img src="../assets/img/icon.svg" alt="头像"> -->
    </div>
    <div class="operate" v-if="operate">
      <span @click="signIn" class="signIn">登录</span>
      <span>/</span>
      <span class="signUp">注册</span>
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
      console.log(param);
      this.operate=false;
      this.src=param.avatarUrl;
      this.nickname=param.nickname;
    }
  }
};
</script>
<style scoped>
.loginArea {
  width: 80px;
  margin: 0 auto;
  margin-top: 60px;
  text-align: center;
}
.operate{
  margin-top: 5px;
  cursor: pointer;
  color: #fff;
}
.signIn:hover,.signUp:hover{
  color:#ff0000;
}
.dialog-footer{
  display: flex;
  justify-content:center;
}
.icon{
  width: 64px;
  height: 64px;
}
.nickname{
  text-align: center;
}
</style>