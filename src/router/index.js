import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index.vue';
import all from '../components/all.vue';
import good from '../components/good.vue';
import share from '../components/share.vue';
import ask from '../components/ask.vue';
import job from '../components/job.vue';
import dev from '../components/dev.vue';
import topic from '../components/topic.vue';
import update_topic from '../components/update_topic.vue';
import page from '../components/page.vue';
import login from '../components/login.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: index,
      children: [
        {
          path: 'all/:page',
          name:'all',
          component: all
        },
        {
          path: 'good/:page',
          name:'good',
          component: good
        },
        {
          path: 'share/:page',
          name:'share',
          component: share
        },
        {
          path: 'ask/:page',
          name:'ask',
          component: ask
        },
        {
          path: 'job/:page',
          name:'job',
          component: job
        },
        {
          path: 'dev/:page',
          name:'dev',
          component: dev
        },
        {
          path:'page/:id',
          name:'page',
          component: page
        },
        {
          path:'login',
          name:'login',
          component: login
        },
        {
          path:'topic/:name',
          name:'topic',
          component: topic
        },
        {
          path:'topic/:name/:id',
          name:'topic',
          component: update_topic
        },
        {
          path:'all',
          redirect:'all/1'
        },
        {
          path:'good',
          redirect:'good/1'
        },
        {
          path:'share',
          redirect:'share/1'
        },
        {
          path:'ask',
          redirect:'ask/1'
        },
        {
          path:'job',
          redirect:'job/1'
        },
        {
          path:'dev',
          redirect:'dev/1'
        },
        {
          path:'/',
          redirect:'all/1'
        }
      ]
    }
  ],
  scrollBehavior(){
    return { x: 0, y: 0}
  }
})
