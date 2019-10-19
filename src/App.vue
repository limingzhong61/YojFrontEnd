<template>
  <div id="app">
    <TopBar v-show="!$route.meta.hideTopBar"></TopBar>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import TopBar from "./components/TopBar/TopBar.vue";
import Footer from "./components/Footer/Footer.vue";
export default {
  name: "app",
  components: {
    TopBar,
    Footer
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
