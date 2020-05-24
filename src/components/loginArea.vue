<template>
  <div class="loginArea">
    <div class="icon">
      <img :src="src" alt="头像" />
      <!-- <img src="../assets/img/icon.svg" alt="头像"> -->
    </div>
    <div class="operate">
      <span @click="dialogVisible = true" class="signIn">登录</span>
      <span>/</span>
      <span class="signUp">注册</span>
    </div>
    <el-dialog title="登录" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <sign-in-form @ref="SignInForm"></sign-in-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reset">重填</el-button>
        <el-button type="primary" @click="dialogVisible = false">登录</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const src = require("../assets/img/icon.svg");
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
      form:{}
    };
  },
  methods:{
    handleClose(){
      console.log("handleClose");
    },
    SignInForm(index){
      this.form=index;
    },
    reset(){
      //console.log(this.$refs.signInForm);
      this.form.resetFields();
      console.log("ok");

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
</style>