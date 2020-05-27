<template>
  <div class="SignInForm">
    <el-dialog
      title="登录"
      :visible.sync="dialogVisible"
      width="50%"
      :center="true"
      :show-close="false"
    >
      <el-form
        ref="SignInForm"
        :model="form"
        label-width="80px"
        :rules="signInRule"
        :status-icon="true"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="form.pwd" type="password" :show-password="true" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="signIn">登录</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {phone} from "../netWork/request"
export default {
  name: "SignInForm",
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    let phoneReg = (rule, value, callback) => {
      const reg = /^1[3578][0-9]{9}$/;
      if (reg.test(value)) {
        console.log("ok");
        callback();
      } else {
        callback(new Error("请输入正确的手机号"));
      }
    };
    return {
      form: {
        phone: "18844216693",
        pwd: "rmd730913"
      },
      signInRule: {
        phone: [{ validator: phoneReg, trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleClose() {
      this.close();
    },
    signIn() {
      this.$refs.SignInForm.validate(valid=>{
        if(!valid){
            return;
        }else{
          phone(this.form).then((res)=>{
            console.log(res);
            console.log(document.cookie.split(";")[1].split("=")[1]);
            this.$emit("sendData",res.data.profile)
            this.close();
          })
        }
      })
      
      //phone();
    },
    close() {
      this.$refs.SignInForm.resetFields();
      this.$emit("close");
    }
  }
};
</script>