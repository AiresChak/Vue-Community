<template>
  <el-row>
    <el-col :span="3" :offset="1">
      <img @click="goHome" class="logo" src="../assets/cnodejs_light.svg" alt=""/>
    </el-col>
    <el-col v-if="!logined" :span="3" :offset="17">
      <el-button class="btn" type="text">注册</el-button>&nbsp;&nbsp;
      <el-button class="btn" @click="login" type="text">登录</el-button>
    </el-col>
    <el-col v-if="logined" :span="3" :offset="17">
      <img :src="userInfos&&userInfos.avatar_url" height="30" style="vertical-align:middle;" alt=""/>&nbsp;
      <el-button class="btn" type="text">{{userInfos&&userInfos.loginname}}</el-button>&nbsp;<el-button @click="logout" class="btn" type="text">退出</el-button>
    </el-col>
  </el-row>

</template>

<script>
  import {mapState,mapMutations,mapActions} from 'vuex';
  export default {
    name:'appheader',
    computed:{
      ...mapState([
        'logined',
        'userInfos'
      ])
    },
    methods:{
      ...mapMutations([
        'editLogined'
      ]),
      ...mapActions([
        'getUserInfos'
      ]),
      login(){
        this.$router.push({
          path:'/login'
        });
      },
      logout(){
        this.$cookie.delete('token');
        window.location.reload();
      },
      goHome(){
        this.$router.push({
          path:'/all/1'
        })
      }
    }
  }

</script>

<style>
  .logo{
    height:30px;
    margin-top:15px;
  }
  .btn{
    color:#eee;
  }
  .btn:hover{
    color:#999;
  }
</style>
