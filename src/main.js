import Vue from 'vue'
import App from './App.vue'

//使用bootstarp
import $ from 'jquery'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import store from "./store"
Vue.config.productionTip = false

new Vue({
  $,
  render: h => h(App),
  store
}).$mount('#app')
