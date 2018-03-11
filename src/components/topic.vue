<template>

  <el-card style="margin:0 200px;height:800px;">
    <el-row class="row">
      <el-col :span="1">主题：</el-col>
      <el-col :span="14">
        <el-input v-model="title"></el-input>
      </el-col>
    </el-row>
    <el-row class="row">
      <el-col class="col" :span="1">标签：</el-col>
      <el-col class="col" :span="2">
        <el-select v-model="value==''?tab:value" placeholder="请选择">
          <el-option
            v-for="item in Tabs"
            :key="item.index"
            :value="item.tab">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="row lastrow">
      <el-col :span="1">内容：</el-col>
      <el-col :span="22">
        <!--<el-input v-model="content"
          type="textarea"
          :autosize="{minRows:16}"
          placeholder="请输入内容">
        </el-input>-->
        <markdown-editor v-model="content" class="editor"></markdown-editor>
      </el-col>
    </el-row>
    <el-row class="row">
      <el-col :span="4" :offset="20">
        <el-button @click="send" type="success">提交</el-button>
        <el-button @click="cancel" type="info">取消</el-button>
      </el-col>
    </el-row>
  </el-card>

</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex';
  import markdownEditor from 'vue-simplemde/src/markdown-editor';
  export default {
    name:'topic',
    data(){
      return{
        Tabs:[
          {tab:'dev',index:1},
          {tab:'ask',index:2},
          {tab:'share',index:3},
          {tab:'job',index:4}
        ],
        value:'',
        title:'',
        content:''
      }
    },
    components:{
      markdownEditor
    },
    computed:{
      ...mapState([
        'loginId'
      ]),
      tab(){
        var tab = '';
        if(this.$route.params.name=='all'||this.$route.params.name=='good'){
          tab = 'dev';
          this.value = 'dev';
        }else{
          tab = this.$route.params.name;
          this.value = this.$route.params.name;
        }
        return tab;
      }
    },
    methods:{
      ...mapMutations([
        'editcontentInfo'
      ]),
      ...mapActions([
        'sendContent'
      ]),
      send(){
        if(this.title==''){
          this.$message({
            type:'error',
            message:'标题不能为空'
          });
        }else if(this.title.length<5){
          this.$message({
            type:'error',
            message:'标题太短'
          });
        }else if(this.content==''){
          this.$message({
            type:'error',
            message:'内容不能为空'
          });
        }else{
          this.editcontentInfo({
            title : this.title,
            tab : this.tab,
            content : this.content
          });
          const loading = this.$loading({
            lock:true,
            text:'发送中...',
            spinner:'el-icon-loading',
            background:'rgba(0,0,0,.5)'
          });
          this.sendContent(this.$cookie.get('token'))
            .then(()=>{
              loading.close();
              this.$message({
                type:'success',
                message:'发送成功',
                duration:1000
              }),
              this.$router.push({
                path:'/page/'+this.loginId
              })
            .catch(()=>{
              loading.close();
              this.$message({
                type:'error',
                message:'发送失败',
                duration:1000
              })
            })
          })
        }
      },
      cancel(){
        this.$router.go(-1);
      }
    }
  }
</script>

<style>
  .row{
    margin-bottom:20px;
    display:flex;
    flex-direction: row;
    align-items: center;
  }
  .lastrow{
    align-items: flex-start;
    height:450px;
  }
  .editor{
    height:400px;
    background-color:#fff;
  }

</style>
