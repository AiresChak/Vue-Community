<template>

  <el-row style="margin-top:40px;">
    <el-col :span="8" :offset="8">
      <el-card>
        <h2 slot="header" style="text-align:center;">登录</h2>
        <el-row>
          <el-col :span="24">
            <el-input ref="user" class="inputbox" v-model="username" placeholder="用户名/邮箱/手机号"></el-input>
          </el-col>
          <el-col :span="24">
            <el-input ref="psw" class="inputbox" type="password" v-model="password"  placeholder="密码"></el-input>
          </el-col>
          <el-col :span="24">
            <el-button @click="userLogin" type="primary">登录</el-button>
            <el-button @click="cancel" type="info">取消</el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>

</template>

<script>
  import {mapState,mapMutations,mapActions} from 'vuex';
  export default {
    name:'login',
    data(){
      return {
        username:"",
        password:""
      }
    },
    computed:{
      ...mapState([
        'userInfo',
        'accessToken'
      ])
    },
    methods:{
      ...mapMutations([
        'editLogined'
      ]),
      ...mapActions([
        'getUserInfos'
      ]),
      userLogin(){
        if(this.username==this.userInfo.username){
          if(this.password==this.userInfo.password){
            console.log(this.$cookie);
            var date = new Date();
            date.setDate(date.getDate()+7);
            this.$cookie.set('token',this.accessToken,{ expires: date.toGMTString() });
            this.editLogined(true);
            this.getUserInfos();
            this.$router.go(-1);
          }else{
            this.$message({
              type:'error',
              message:'密码错误',
              showClose:true,
              duration:1000
            });
            this.$refs.psw.focus();
          }
        }else{
          this.$message({
            type:'error',
            message:'用户不存在',
            showClose:true,
            duration:1000
          });
          this.$refs.user.focus();
        }
      },
      cancel(){
        this.$router.go(-1);
      }
    }
  }
</script>

<style>
  .inputbox{
    margin-bottom:30px;
  }
</style>
