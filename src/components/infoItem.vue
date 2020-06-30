<template>
  <div class="infoItem">
    <el-popover placement="right" width="200" trigger="manual" v-model="isShow" v-if="content.list">
      <mu-list>
        <mu-list-item button v-for="item in $store.state.playList" :key="item.id" :ripple="false" @click="getMusic(item.id)">
            <loop-scroll :content="item" :exam="false" v-if="isShow"></loop-scroll>
        </mu-list-item>
        <mu-list-item button @click="addPlayListForm">
          <mu-icon value="add"></mu-icon>
        </mu-list-item>
      </mu-list>
      <el-button slot="reference" @click="show" class="infoItemBtn">{{content.name}}</el-button>
    </el-popover>
    <el-button v-else class="infoItemBtn">{{content.name}}</el-button>
    <el-dialog
      title="添加歌单"
      :visible.sync="dialogVisible"
      width="50%"
      :center="true"
      :show-close="false"
      v-if="content.list"
    >
      <el-form
        ref="SignInForm"
        :model="form"
        label-width="80px"
        :rules="addRule"
        :status-icon="true"
      >
        <el-form-item label="歌单名" prop="listName">
          <el-input v-model="form.listName" clearable></el-input>
        </el-form-item>
        <el-form-item label="私密歌单">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPlayListForm">取消</el-button>
        <el-button type="primary" @click="addPlayList">添加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import loopScroll from "./loopScroll"
import {addPlayList,getPlayListDetails} from "../netWork/request"
export default {
  name: "infoItem",
  props: {
    content: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      isShow:false,
      dialogVisible:false,
      form:{
        listName:"",
        privacy:false,

      },
      addRule:{
        listName:[{ required: true, message: "请输入歌单名", trigger: "blur" }]
      }
    };
  },
  methods:{
    show(){
        this.isShow=!this.isShow;
    },
    addPlayListForm(){
      this.dialogVisible=!this.dialogVisible;
    },
    addPlayList(){
      addPlayList(this.form).then(res=>{
        console.log(res);
      })
    },
    getMusic(id){
      getPlayListDetails(id).then(res=>{
        console.log(res.data.playlist.tracks);
        this.$store.commit("addMusic",res.data.playlist.tracks)

      })
    }
  },
  components:{
    loopScroll
  }
};
</script>
<style scoped>
.infoItem{
  width: 100px;
  margin: 0 auto;
  display: block;
}
.infoItem .infoItemBtn {
  width: 100px;
  margin: 0 auto;
  color: #fff;
  background-color: inherit;
}
.infoItem .infoItemBtn:hover,
.infoItem .infoItemBtn:active,
.infoItem .infoItemBtn:focus{
  background-color: inherit;
  color: white;
}
</style>