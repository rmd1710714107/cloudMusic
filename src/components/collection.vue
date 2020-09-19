<template>
<!-- 收藏组件 -->
    <div class="collection">
      <div class="menu">
        <ul class="tab">
          <li class="tabItem" v-for="(item,index) in tabs" :key="index" :class="{border:index!==0,active:index===activeItem}" @click="collDetails(index)">{{item}}</li>
        </ul>
      </div>
      <router-view></router-view>
      
    </div>
</template>

<script>
export default {
  name:"collection",
  components: {},
  data() {
    return {
      tabs:["专辑","歌手","视频"],
      activeItem:0
    };
  },
  methods:{
    collDetails(arg){
      this.activeItem=arg;
      switch (arg) {
        case 0:
          this.$router.replace("/album");
          break;
        case 1:
          this.$router.replace("/singer");
          break;
        default:
           this.$router.replace("/video");
          break;
      }
    }
  },
  activated(){
    if (this.activeItem!==0) {
    this.collDetails(this.activeItem);
    }
  }
}
</script>
<style scoped>
.menu{
  width: 100%;
  height: 50px;
  padding: 12.5px 0;
  
}
.menu .tab{
  list-style: none;
  width:275px;
  height: 22px;
  display: flex;
  margin: 0 auto;
  border: 1px solid #DDDDDD;
  background-color: #fff;
  border-radius: 3px;

}
.menu .tabItem{
  width: 90px;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
  box-sizing: content-box;
  font-size: 12px;
}
.border{
  border-left:1px solid #DDDDDD;
}
.active{
  background-color: #646464;
  color: white;
}
</style>