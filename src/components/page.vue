<template>
  <el-row :gutter="10">
    <el-col :span="4">
      <side_nav></side_nav>
    </el-col>
    <el-col :span="20">
      <el-card class="card">
        <div v-if="!loading">
          <h3 slot="header" class="el-icon-news">&nbsp;&nbsp;内容详情</h3>
          <h2 class="p-title">
            <span>{{pageData&&pageData.title}}</span>&nbsp;
            <el-tag size="small" type="danger" v-if="pageData&&pageData.top">置顶</el-tag>
            <el-tag size="small" type="success" v-else-if="pageData&&pageData.good">精华</el-tag>
            <el-tag size="small" type="default" v-else-if="pageData&&pageData.tab=='share'">分享</el-tag>
            <el-tag size="small" type="info" v-else-if="pageData&&pageData.tab=='ask'">问答</el-tag>
            <el-tag size="small" type="info" v-else="pageData&&pageData.tab=='job'">招聘</el-tag>
          </h2>

          <small> · 发布于 {{countTime(pageData&&pageData.create_at)}}&nbsp;&nbsp;· 作者 {{pageData&&pageData.author.loginname}}&nbsp;&nbsp;· {{pageData&&pageData.visit_count}} 次浏览&nbsp;&nbsp;· 来自 {{choosetag(pageData)}}</small>
          <br />
          <el-button v-if="userInfo.username==pageData.author.loginname" @click="edit" type="text" class="el-icon-edit-outline">修改</el-button>
          <br />
          <div class="markdown-body" style="margin-top:50px;" v-html="pageContent"></div>
        </div>
      </el-card>
      <br/>
      <el-card class="card">
        <div v-if="!loading">
          <h3 slot="header" class="el-icon-edit">&nbsp;&nbsp;评论内容</h3>
          <el-table
            :data="pageReplies"
            :show-header="false"
          >
            <el-table-column>
              <template slot-scope="scope">
                <el-row>
                  <el-col :span="1">
                  <img style="height:40px;" :src="scope.row.author.avatar_url" alt=""/>
                  </el-col>
                  <el-col :span="23">
                    <div style="height:20px;">
                      <strong>{{scope.row.author.loginname}}</strong>
                      <small style="color:#81bdf4;">{{countTime(scope.row.create_at)}}</small>
                      <span style="float:right;padding-right:10px;color:#999;"><i class="el-icon-star-on"></i>&nbsp;{{scope.row.ups.length}}</span>
                    </div>
                    <div class="bg" v-html="scope.row.content"></div>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <el-card class="card">
        <div v-if="!loading">
          <h3 slot="header" class="el-icon-edit">&nbsp;&nbsp;发布评论</h3>
          <markdown-editor v-model="content" class="editor"></markdown-editor>
          <el-button @click="reply" type="primary" size="small">回复</el-button>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import {mapState,mapActions} from 'vuex';
  import side_nav from './sidenav.vue';
  import axios from 'axios';
  import markdownEditor from 'vue-simplemde/src/markdown-editor';

  var config = {
    rootUrl:'https://cnodejs.org/api/v1/topic',
    replies:'/replies'
  };

  export default {
    name:'page',
    data(){
      return {
        loading:false,
        content:''
      }
    },
    components:{
      side_nav,
      markdownEditor
    },
    computed:{
      ...mapState([
        'pageData',
        'pageContent',
        'pageReplies',
        'userInfo'
      ])
    },
    methods:{
      ...mapActions([
        'getData'
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
      choosetag(t){
        var tag = '';
        if(t && t.top){
          tag = '置顶'
        }else if(t && t.good){
          tag = '精华'
        }else if(t && t.tab=='share'){
          tag = '分享'
        }else if(t && t.tab=='ask'){
          tag = '问答'
        }else if(t && t.tab=='job'){
          tag = '招聘'
        }else{
          tag = '测试'
        }

        return tag;
      },
      edit(){
        this.$router.push({
          path:'/topic/'+ this.pageData.tab + '/' + this.pageData.id
        })
      },
      reply(){
        var {rootUrl,replies} = config;
        axios.post(`${rootUrl}/${this.$route.params.id}${replies}`,{
          "accesstoken":this.$cookie.get('token'),
          "content":this.content
        })
          .then((data)=>{
            this.getData({id:this.$route.params.id})
              .then(()=>{
                this.$message('发送成功');
                this.content=''
              })
          })
          .catch(err=>{
              console.log(err);
          })
      }
    },
    beforeMount(){
      this.loading = true;
      const load = this.$loading({
        lock:true,
        text:'Loading',
        spinner:'el-icon-loading',
        bakcgound:'rgba(0,0,0,0.3)'
      });
      this.getData({id:this.$route.params.id})
        .then(()=>{
          this.loading = false;
          console.log(this.pageReplies);
          load.close();
      });
    }
  }
</script>

<style>
  .p-title{
    padding:15px;
    background-color: rgba(219,219,219,.3);
  }
  .bg{
    padding:10px 15px;
    margin:15px 0;
    background-color: rgba(219,219,219,.2);
  }
  .card{
    margin-bottom:10px;
  }
  .editor{
    height:400px;
    background-color:#fff;
  }
</style>
