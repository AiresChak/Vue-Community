<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {mapMutations,mapActions} from 'vuex';
export default {
  name: 'App',
  methods:{
    ...mapMutations([
      'editLogined'
    ]),
    ...mapActions([
      'getUserInfos'
    ]),
  },
  mounted(){
    this.editLogined(!!this.$cookie.get('token'));
    if(!!this.$cookie.get('token')){
      this.getUserInfos();
    }
  }
}
</script>
<style>
  body{
    background-color:rgba(219,219,219,.6);
  }
</style>
