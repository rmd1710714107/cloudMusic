<template>
  <div class="SignInForm">
    <el-form ref="SignInForm" :model="form" label-width="80px" :rules="signInRule">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input v-model="form.pwd"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SignInForm",
  components: {},
  data() {
    let phoneReg=(rule, value, callback)=>{
      const reg=/^1[3578][0-9]{9}$/;
      if(reg.test(value)|| !value){
        console.log("ok");
        callback();
      }else{
        callback(new Error("手机号码格式错误"))
      }
    }
    return {
      form:{
        phone:"",
        pwd:""
      },
      signInRule:{
        phone:[
          {validator:phoneReg,trigger:"blur"}
        ],
        pwd:[
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  mounted(){
    this.$emit("ref",this.$refs.SignInForm)
  }
};
</script>