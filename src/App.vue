<template>
  <div id="app">
    <TopBar></TopBar>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import TopBar from "./components/TopBar/TopBar.vue";
import Footer from "./components/Footer/Footer.vue";
import router from "./router";
// import $ from 'jquery'
// import request from './api/ajax.js'
// import axios from 'axios'
export default {
  name: "app",
  components: {
    TopBar,
    Footer
  },
  router,
  mounted(){
        // console.log('topage')

    }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
