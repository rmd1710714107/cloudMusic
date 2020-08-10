<template>
  <div class="SignInForm">
    <el-dialog
      title="登录"
      :visible.sync="dialogVisible"
      width="50%"
      :center="true"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <el-form
        ref="SignInForm"
        :model="form"
        label-width="80px"
        :rules="signInRule"
        :status-icon="true"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input  @keyup.native.enter="signIn" v-model="form.phone" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input  @keyup.enter.native="signIn" v-model="form.pwd" type="password" :show-password="true" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox-group v-model="checked">
            <el-checkbox @change="hanlde">自动登录</el-checkbox>
          </el-checkbox-group>
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
import { phone, getUsrInfo } from "../netWork/request";
import { message } from "../utils/utils";
//import {encode,decode} from "../utils/encode"
import localSetting from "../Nedb/setting"
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
        callback();
      } else {
        callback(new Error("请输入正确的手机号"));
      }
    };
    return {
      form: {
        phone: "",
        pwd: ""
      },
      signInRule: {
        phone: [{ validator: phoneReg, trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      checked: false
    };
  },
  mounted(){
    // this.$bus.$on("autoSign",(arg)=>{
    //   this.form.phone=arg.phone;
    //   this.form.pwd=arg.pwd;
    //   console.log(this.form);
    //   //this.signIn()
    // })
  },
  methods: {
    handleClose() {
      this.close();
    },
    signIn() {
      this.$refs.SignInForm.validate(valid => {
        if (!valid) {
          return;
        } else {
          if(this.checked){
            //localSetting.insert({phone:this.form.phone,pwd:encode(this.form.pwd)}).then(res=>{
            //})
          }
          phone(this.form).then(res => {
            if (res.data.code !== 200) {
              console.log(res.data);
              message("error", res.data.msg);
              //this.$refs.SignInForm.resetFields();
            } else {
              this.$store.commit("addUserInfo",res.data.profile)
              this.getUsrInfo(res.data.account.id);
              this.close();
            }
          });
        }
      });
    },
    close() {
      this.$refs.SignInForm.resetFields();
      this.$emit("close");
    },
    getUsrInfo(usrId) {
      getUsrInfo(usrId).then(res => {
        res.data.playlist.shift();
        this.$store.commit("getPlayList", res.data.playlist);
      });
    },
    hanlde(checked){
      if(checked){
        let warn="如果您在使用公共计算机登录,不建议勾选此项";
        message("warning",warn);
        warn=null;
      }
    }
  }
};
</script>