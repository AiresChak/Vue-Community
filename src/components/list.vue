<template>
  <el-card body-style="{padding:0}">
    <h3 slot="header">
      <el-row>
        <el-col :span="2">
          <i class="el-icon-tickets"></i>&nbsp;列表
        </el-col>
        <el-col :span="2" :offset="20">
          <el-button @click="toTopic" type="success" size="medium">新建主题</el-button>
        </el-col>
      </el-row>
    </h3>
    <el-table
      :data="list"
      :show-header="false"
      stripe
      style="width: 100%">
      <el-table-column
        label="头像"
        width="40">
        <template slot-scope="scope">
          <img class="ava" :src="scope.row.author.avatar_url" alt=""/>
        </template>
      </el-table-column>
      <el-table-column
        label="访问数"
        width="100">
        <template slot-scope="scope">
          <strong>{{scope.row.reply_count}}</strong>/ <small>{{scope.row.visit_count}}</small>
        </template>
      </el-table-column>
      <el-table-column
        label="标题">
        <template slot-scope="scope">
          <el-tag size="mini" type="danger" v-if="scope.row.top">置顶</el-tag>
          <el-tag size="mini" type="success" v-else-if="scope.row.good">精华</el-tag>
          <el-tag size="mini" type="default" v-else-if="scope.row.tab=='share'">分享</el-tag>
          <el-tag size="mini" type="info" v-else-if="scope.row.tab=='ask'">问答</el-tag>
          <el-tag size="mini" type="info" v-else-if="scope.row.tab=='job'">招聘</el-tag>
          &nbsp;&nbsp;<router-link :to="{path:'/page/'+scope.row.id}" style="color:#444;text-decoration:none;">{{scope.row.title}}</router-link>
        </template>
      </el-table-column>
      <el-table-column
        label="最后回复"
        width="100">
        <template slot-scope="scope">
          {{countTime(scope.row.last_reply_at)}}
        </template>
      </el-table-column>
    </el-table>

    <pagebtn :pagenum="pagenum"></pagebtn>

  </el-card>

</template>
<script>
  import {mapState,mapMutations,mapActions} from 'vuex';
  import pagebtn from './pagebtn.vue';

  export default {
    props:['pagenum'],
    name:'list',
    components:{
      pagebtn
    },
    computed:{
      ...mapState([
        'list'
      ])
    },
    methods:{
      ...mapMutations([
        'editListof',
        'editPage'
      ]),
      ...mapActions([
        'getList'
      ]),
      countTime(t){
        var now = new Date().getTime();
        var last = new Date(t).getTime();

        var time = now - last;

        // 计算天数、小时、分钟
        var d = Math.floor(time/(24*60*60*1000));
        var h = Math.floor(time%(24*60*60*1000)/(60*60*1000));
        var m = Math.floor(time%(60*60*1000)/(60*1000));

        var data = d>0?(d>90?' 3 个月前':d>30?' 1 个月前':d+' 天前'):h>0?h+' 小时前':m>0?m+' 分钟前':'刚刚';

        return data;
      },
      toTopic(){
        if(!this.$cookie.get('token')){
          this.$message({
            type:'error',
            message:'请先登录',
            duration:1000
          })
        }else{
          this.$router.push({
            path:"/topic/"+this.$route.name
          });
        }
      }
    },
    beforeMount(){
      console.log(this.$route);
      this.editPage(this.$route.params.page);
      this.editListof(this.$route.name);
      this.getList();
    }
  }
</script>

<style>
  .ava{
    height:30px;
  }
</style>
