<template>
    <el-button size="mini" :style="style" @click="click" circle></el-button>
</template>

<script>
const {ipcRenderer: ipc} = require('electron');
const style = {
        min: {
            backgroundImage:"url("+require('../../../assets/img/min.svg')+")",
            backgroundColor:"green"
        },
        max: {
            backgroundImage:"url("+require('../../../assets/img/max.svg')+")",
            backgroundColor:"#d68910"
        },
        close: {
            backgroundImage:"url("+require('../../../assets/img/close.svg')+")",
            backgroundColor:"red"
        }
    };
    export default {
        name: 'TitleButton',
        props: ['type'],
        computed: {
            style: function () {
                return style[this.type];
            }
        },
        methods: {
            click: function () {
                ipc.send(this.type);
            }
        }
    }
</script>
<style scoped>
.el-button{
  width: 22px;
  height: 22px;
  background-position: 50% 50%;
  background-repeat: no-repeat;
}
</style>