import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

var config = {
  rootUrl:'https://cnodejs.org/api/v1',
  topics:'/topics',
  topic:'/topic',
  userInfos:'/user',
  update:'/topics/update'
};

export default new Vuex.Store({
  state:{
    list_of:"all",
    list:[],
    page:1,
    pageData:null,
    pageContent:null,
    pageReplies:null,
    accessToken:'tokennumber',
    userInfo:{
      username:'usename',
      password:'pwd'
    },
    userInfos:null,
    logined:false,
    fullscreenLoading:false,
    contentInfo:{
      title:'',
      tab:'dev',
      content:''
    },
    loginId:''
  },
  getters:{},
  mutations:{
    editListof(state,name){
      state.list_of = name;
    },
    editList(state,newlist){
      state.list = newlist;
    },
    editPage(state,num){
      state.page = num;
    },
    editData(state,data){
      state.pageData = data;
      state.pageContent = data.content;
      state.pageReplies = data.replies;
    },
    editUser(state,infos){
      state.userInfos = infos;
    },
    editLogined(state,bool){
      state.logined = bool;
    },
    editfullscreenLoading(state,bool){
      state.fullscreenLoading = bool;
    },
    editcontentInfo(state,content){
      Object.assign(state.contentInfo,content);
    },
    editloginId(state,id){
      state.loginId = id;
    }
  },
  actions:{
    getList(context){
      var {rootUrl,topics} = config;
      return axios.get(rootUrl+topics,{
        params:{
          tab:context.state.list_of,
          page:context.state.page
        }
      })
        .then(data=>{
          console.log(data.data.data);
          context.commit('editList',data.data.data);
        });

    },
    getData(context,params){
      var {rootUrl,topic} = config;
      return axios.get(rootUrl+topic+'/'+params.id,{
        params:{
          mdrender:params.mdrender||"true"
        }
      })
        .then(data=>{
          context.commit('editData',data.data.data);
        });
    },
    getUserInfos(context){
      var {rootUrl,userInfos} = config;
      return axios.get(rootUrl+userInfos+'/'+context.state.userInfo.username)
        .then(data=>{
          context.commit('editUser',data.data.data);
        });
    },
    sendContent(context,token){
      var {rootUrl,topics} = config;
      var data = Object.assign(context.state.contentInfo,{accesstoken:token});
      return axios.post(rootUrl+topics,data)
        .then(data=>{
          context.commit('editloginId',data.data.topic_id);
        });
    },
    updateData(context,params){
      var {rootUrl,update} = config;
      var data = {
        "title":context.state.contentInfo.title,
        "content":context.state.contentInfo.content,
        "tab":context.state.contentInfo.tab,
        "accesstoken":params.token,
        "topic_id":params.id
      }
      return axios.post(rootUrl+update,data)
        .then(data=>{
          context.commit('editData',data.data);
        });
    }
  }
})
