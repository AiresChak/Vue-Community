<template>

  <div style="text-align:center;">
    <el-button-group class="pagebtn">
      <el-button @click="prev" size="mini" type="primary" icon="el-icon-arrow-left">上一页</el-button>
      <el-button @click="next" size="mini" type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </el-button-group>
  </div>

</template>

<script>
  import {mapState,mapMutations,mapActions} from 'vuex';
  export default {
    props:['pagenum'],
    name:'pagebtn',
    computed:{
      ...mapState([
        'page'
      ])
    },
    methods:{
      ...mapMutations([
        'editPage'
      ]),
      ...mapActions([
        'getList'
      ]),
      prev(){
        if(this.$route.params.page-1<=0){
          this.$message({
            message:'目前已到达第一页',
            type:'warning',
            duration:1000
          });
          return false;
        }
        const loading = this.$loading({
          lock:true,
          text:'Loading',
          spinner:'el-icon-loading',
          bakcgound:'rgba(0,0,0,0.3)'
        });
        this.$router.push({path:`/${this.$route.name}/${this.$route.params.page-1}`});
        this.editPage(this.$route.params.page);
        this.getList()
          .then(()=>{
            loading.close();
          });
      },
      next(){
        if(this.$route.params.page- -1>this.pagenum){

          this.$message({
            message:'已到达最后一页',
            type:'warning',
            duration:1000
          });
          return false;
        }

        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.3)'
        });

        this.$router.push({path:`/${this.$route.name}/${this.$route.params.page- -1}`});

        this.editPage(this.$route.params.page);

        this.getList()
          .then(()=>{
          loading.close();
        });

      }
    }
  }
</script>

<style>
  .pagebtn{
    margin:20px auto;
  }

</style>
