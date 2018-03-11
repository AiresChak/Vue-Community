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
        <el-button @click="send" type="success">确认修改</el-button>
        <el-button @click="cancel" type="info">取消</el-button>
      </el-col>
    </el-row>
  </el-card>

</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex';
  import markdownEditor from 'vue-simplemde/src/markdown-editor';
  export default {
    name:'update_topic',
    data(){
      return{
        title:'',
        content:'',
        tab:this.$route.params.name
      }
    },
    components:{
      markdownEditor
    },
    computed:{
      ...mapState([
        'pageData',
        'pageContent',
        'contentInfo'
      ])
    },
    methods:{
      ...mapMutations([
        'editcontentInfo'
      ]),
      ...mapActions([
        'updateData',
        'getData'
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
          this.updateData({
            token:this.$cookie.get('token'),
            id:this.$route.params.id
          })
            .then(()=>{
              loading.close();
              this.$message({
                type:'success',
                message:'修改成功',
                duration:1000
              }),
              this.$router.push({
                path:'/page/'+this.$route.params.id
              })
            .catch(()=>{
              loading.close();
              this.$message({
                type:'error',
                message:'修改失败',
                duration:1000
              })
            })
          })
        }
      },
      cancel(){
        this.$router.go(-1);
      }
    },
    beforeMount(){
      this.getData({id:this.$route.params.id,mdrender:'false'})
        .then(()=>{
          this.content = this.pageContent,
          this.title = this.pageData.title
        });
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
