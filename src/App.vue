<template>
    <div id="app">
        <TopBar v-if="!$route.meta.hideTopBar"></TopBar>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>

<script>
    import TopBar from "./components/TopBar/TopBar.vue";
    import Footer from "./components/Footer/Footer.vue";
    import {RECEIVE_USER} from "./store/mutations-types";
    import {getCurrentUserInfo} from "./api/requeset";

    export default {
        name: "app",
        components: {
            TopBar,
            Footer
        },
        beforeCreate() {
            getCurrentUserInfo()
                .then(res => {
                    // console.log(res);
                    console.log(res.success);
                    if (res.success) {
                        const user = res.extend.user;
                        this.$store.commit(RECEIVE_USER, {
                            user
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            // const href = window.location.href;
            // const index = href.indexOf("/#/");
            // const path = href.slice(index + 2);
            // // console.log(path);
            // if (
            //   path != "/register" &&
            //   path != "/login" &&
            //   path != "/user/resetPassword"
            // ) {
            //   getCurrentUserInfo
            //     .then(res => {
            //       // console.log(res);
            //       if (res.data.success) {
            //         const user = res.data.extend.user;
            //         this.$store.commit(RECEIVE_USER, {
            //           user
            //         });
            //       } else {
            //         this.$router.replace("/login");
            //       }
            //     })
            //     .catch(err => {
            //       console.log(err);
            //       this.$router.replace("/login");
            //     });
            // }
        }
    };
</script>

<style>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 1.0rem;
        /* text-align: center; */
        /* color: #2c3e50; */
        /* background-color: white; */

        margin-top: 60px;
    }

    /*.my-set {*/
    /*  margin-top: 80px;*/
    /*  background-color: rgb(228, 241, 255);*/
    /*}*/
</style>
