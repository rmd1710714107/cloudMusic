<template>
  <div class="header">
      <div class="title" style="-webkit-app-region: no-drag;">
        <title-button v-for="(item,index) in type" :key="index" :type="item"></title-button>
      </div>
    
  </div>
</template>

<script>
import titleButton from "./childCom/titleButton"
export default {
  name: "headerInfo",
  components: {
    titleButton
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
}
.title {
  margin-top: 4px;
}
</style>