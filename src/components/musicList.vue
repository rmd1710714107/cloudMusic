<template>
  <div class="musicList">
    <mu-data-table
      :columns="columns"
      :data="this.$store.state.musicList"
      :min-col-width="60"
      
    >
      <template slot-scope="scope">
        <td>{{scope.$index+1}}</td>
        <td @click="play(scope.row)">
          <loop-scroll :content="scope.row" :exam="false"></loop-scroll>
        </td>
        <td>{{"未知"}}</td>
        <td>{{"未知"}}</td>
        <td>{{"未知"}}</td>
      </template>
    </mu-data-table>
  </div>
</template>

<script>
import loopScroll from "./loopScroll";
import { getmusicUrl } from "../netWork/request";
export default {
  name: "musicList",
  components: {
    loopScroll
  },
  data() {
    return {
      sort: {
        name: '',
        order: 'asc'
      },
      selects:[],
      columns: [
          { title: '',  name: 'name',align: 'center', },
          { title: '歌曲', name: 'calories',width: 200, align: 'center',  },
          { title: '歌手', name: 'fat', align: 'center',  },
          { title: '专辑', name: 'carbs', align: 'center',  },
          { title: '时长', name: 'protein', align: 'center',  }
      ],
    };
  },
  methods: {
    play(arg){
      if(!arg.path){
        let musicInfo={};
        getmusicUrl(arg.id).then(res=>{
          console.log(res);
          musicInfo.id=res.data.data[0].id;
          musicInfo.name=arg.name;
          musicInfo.url=res.data.data[0].url;
          this.$store.commit("addPlayInfo",musicInfo);
          musicInfo=null;
        })
        console.log(arg);
      }else{
        this.$store.commit("addPlayInfo",arg);
      }
    }
  }
};
</script>
<style>
 .musicList .mu-table td{
   text-align: center;
 }
 .musicList .mu-table th,
 .musicList .mu-table td{
   padding:1px 14px;
 }
 .musicList .mu-table td{
   height:48px
 }
 .musicList .mu-checkbox{
   width: 24px;
   margin: 0 auto;
   display: block;
 }
</style>