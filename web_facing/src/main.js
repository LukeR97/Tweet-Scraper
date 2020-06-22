import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import index from '@/components/HelloWorld';

Vue.config.productionTip = false

Vue.use(VueRouter);

const routes = [
  {path: '/',
   component: index
  }
]

const router = new VueRouter({
  routes: routes
});

new Vue({
  el: '#app',
  router: router,
  render: h =>h(App)
});
