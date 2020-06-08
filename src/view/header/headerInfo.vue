<template>
  <div class="header">
      <search style="-webkit-app-region: no-drag;" ></search>
      <div class="title" style="-webkit-app-region: no-drag;">
        <title-button v-for="(item,index) in type" :key="index" :type="item"></title-button>
      </div>
      
  </div>
</template>

<script>
import titleButton from "./childCom/titleButton"
import search from "../../components/search"
export default {
  name: "headerInfo",
  components: {
    titleButton,
    search
  },
  data() {
    return {
      type: ["min", "max", "close"]
    };
  }
};
</script>
<style scoped>
.header{
  display: flex;
  justify-content: flex-end;
  height: 100%;
}
.title {
  margin-top: 4px;
}
</style>