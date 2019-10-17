<template>
  <div id="app">
    <TopBar></TopBar>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import TopBar from "./components/TopBar/TopBar.vue";
import Footer from "./components/Footer/Footer.vue";
import router from "./router";
export default {
  name: "app",
  components: {
    TopBar,
    Footer
  },
  router,
  created() {
    this.$store.dispatch("getUser");
  }
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
