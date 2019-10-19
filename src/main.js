import Vue from 'vue'
import App from './App.vue'

//使用bootstarp
import $ from 'jquery'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import store from "./store"
import router from './router'
import request from './api/ajax'
import {RECEIVE_USER} from './store/mutations-types'

Vue.config.productionTip = false

new Vue({
  $,
  render: h => h(App),
  store,
  router
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  const flag = to.meta.withOutLogin
  console.log(flag)
  console.log(store.state.user)
  // 判断该路由是否需要登录权限
  if (!flag && !store.state.user) {
    request({
      url: "/user/info",
      method: "GET"
    })
    .then(res => {
      console.log(res);
      if(res.data.success){
        next()
        const user = res.data.extend.user;
        store.commit(RECEIVE_USER, {
          user
        })
      }else{
        next('/login')
      }
    })
    .catch(err => {
      console.log(err);
    });
  } else {
    next()  // 确保一定要有next()被调用
  }
})
