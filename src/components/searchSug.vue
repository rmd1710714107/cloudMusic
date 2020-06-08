<template>
  <div class="suggest">
    <div v-for="(item,index) in suggestItem" :key="index">
      <mu-list v-if="$store.state.suggest[item.category]">
        <mu-sub-header>
          <i
            class="icon"
            :style="{background:'url('+require('../assets/img/'+item.icon)+') no-repeat'}"
          ></i>
          <span class="headTitle">{{item.title}}</span>
        </mu-sub-header>
        <mu-divider></mu-divider>
        <mu-list-item
          button
          :ripple="false"
          v-for="(childItem) in $store.state.suggest[item.category]"
          :key="childItem.id"
        >
          <!-- <div class="content">
            <mu-list-item-title>{{childItem.name}}</mu-list-item-title>
          </div> -->
          <loop-scroll :content="childItem"></loop-scroll>
        </mu-list-item>
      </mu-list>
    </div>
  </div>
</template>

<script>
import loopScroll from "./loopScroll"
export default {
  name: "searchSug",
  components:{
    loopScroll
  },
  props: {
    suggestItem: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  }
};
</script>
<style>
.suggest {
  position: relative;
  z-index: 992;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  width: 240px;
}
.suggest .mu-sub-header {
  font-size: 12px;
  padding-left: 8px;
  padding-bottom: 4px;
  padding-top: 4px;
  height: 24px;
  line-height: inherit;
}
.suggest .mu-list {
  padding-bottom: 0px;
}
.suggest .mu-item {
  padding: 0 0 0 15px;
  height: 30px;
}
.suggest .icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 3px;
}
.suggest .icon,
.suggest .headTitle {
  vertical-align: middle;
}
.suggest .mu-item-wrapper{
  border-bottom:rgba(0, 0, 0, 0.12) solid 1px ;
}
</style>