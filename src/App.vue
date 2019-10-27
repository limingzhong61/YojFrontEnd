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
import request from "./api/ajax";
import { RECEIVE_USER } from "./store/mutations-types";
export default {
  name: "app",
  components: {
    TopBar,
    Footer
  },
  beforeCreate() {
    const href = window.location.href;
    const index = href.indexOf("/#/");
    const path = href.slice(index + 2);
    // console.log(path);
    if (
      path != "/register" &&
      path != "/login" &&
      path != "/user/resetPassword"
    ) {
      // console.log("in");
      request({
        url: "/user/currentInfo",
        method: "GET"
      })
        .then(res => {
          // console.log(res);
          if (res.data.success) {
            const user = res.data.extend.user;
            this.$store.commit(RECEIVE_USER, {
              user
            });
          } else {
            this.$router.replace("/login");
          }
        })
        .catch(err => {
          console.log(err);
          this.$router.replace("/login");
        });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  /* background-color: white; */

  margin-top: 60px;
}
/* body{
    background-color: rgb(239, 239, 239);
} */
</style>
