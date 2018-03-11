<template>

  <el-container>
    <el-header class="my-header">
      <appheader></appheader>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>

</template>

<script>

  import appheader from './header.vue';

  export default {
    name:'index',
    components:{
      appheader
    }
  }

</script>

<style>
  .my-header{
    background-color:#444;
    width:100%;
    color:#fff;
    line-height:60px;
  }


</style>
