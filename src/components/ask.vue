<template>

  <el-row :gutter="10">
    <el-col :span="4">
      <side_nav></side_nav>
    </el-col>
    <el-col :span="20">
      <list pagenum = '20'></list>
    </el-col>
  </el-row>

</template>

<script>

  import side_nav from './sidenav.vue';
  import list from './list.vue';
  export default{
    name:'all',
    components:{
      side_nav,
      list
    }
  }

</script>
