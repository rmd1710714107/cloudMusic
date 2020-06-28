<template>
  <div class="musicList">
    <mu-data-table
      :columns="columns"
      :sort.sync="sort"
      @sort-change="handleSortChange"
      :data="this.$store.state.musicList"
      :min-col-width="60"
      selectable select-all 
      :selects.sync="selects" 
      :checkbox="false"
    >
      <template slot-scope="scope">
        <td>删除</td>
        <td @click="play(scope.row)">
          <loop-scroll :content="scope.row" :exam="false"></loop-scroll>
        </td>
        <td>{{scope.row.artists||"无"}}</td>
        <td>无</td>
        <td>无</td>
      </template>
    </mu-data-table>
  </div>
</template>

<script>
import loopScroll from "./loopScroll";
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
          { title: '操作',  name: 'name',align: 'center', },
          { title: '歌曲', name: 'calories',width: 200, align: 'center',  },
          { title: '歌手', name: 'fat', align: 'center',  },
          { title: '专辑', name: 'carbs', align: 'center',  },
          { title: '时长', name: 'protein', align: 'center',  }
      ],
    };
  },
  methods: {
    handleSortChange ({name, order}) {
      this.list = this.list.sort((a, b) => order === 'asc' ? a[name] - b[name] : b[name] - a[name]);
    },
    play(arg){
      this.$store.commit("addPlayInfo",arg);
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