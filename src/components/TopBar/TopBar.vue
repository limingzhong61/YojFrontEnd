<template>
    <header class="navbar navbar-dark navbar-expand-sm fixed-top">
        <router-link class="navbar-brand" to="/problem">
            <span class="fa fa-yahoo fa-lg text-primary"></span>
<!--            <span class="fa fa-scribd fa-lg text-primary"></span>-->
            YOJ
        </router-link>
        <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <!-- =============== 跳转标题 ==================== -->
            <ul class="navbar-nav mr-auto">
                <li class="nav-item" v-for="(item,index) in routes" :key="index">
                    <a :class="{'nav-link': true,'active': isCurrent(item.path)}" @click="goto(item.path)">
                        <!-- 注意此间没有空格 -->
                        <span :class="item.spanClass"></span>
                        <span>{{item.name}}</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="https://github.com/codeOflI/yoj" title="GitHub">
                        <span class="fa fa-github fa-lg text-secondary"></span>
                    </a>
                </li>
            </ul>
            <!-- ===============个人按钮  ==================== -->
            <ul v-if="user" class="navbar-nav flex-row ml-auto">
                <li class="nav-item dropdown">
                    <a
                            class="nav-item nav-link dropdown-toggle mr-sm-2"
                            href="#"
                            id="bd-versions"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                    >
                        <span class="fa fa-user-circle-o fa-lg text-primary" aria-label="GitHub"></span>
                        {{user.nickName}}
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="bd-versions">
                        <router-link tag="a" :to="'/user/info/'+user.userId" class="dropdown-item" href="#">个人信息
                        </router-link>
                        <router-link tag="a" :to="'/user/update'" class="dropdown-item" href="#">修改信息</router-link>
                        <div class="dropdown-divider"></div>
                        <button class="dropdown-item" type="submit" @click="logout">退出</button>
                    </div>
                </li>
            </ul>
            <form v-else class="form-inline">
                <button class="btn btn-outline-primary my-2 my-sm-0" @click="goto('/login')" type="button">登录</button>
                <button class="btn btn-outline-primary my-2 my-sm-0 ml-1" @click="goto('/register')" type="button"> 注册
                </button>
            </form>
        </div>
    </header>
</template>

<script>
    import {mapState} from "vuex";
    import {logout} from "../../api/requeset";

    export default {
        data() {
            return {
                routes: [
                    {
                        path: "/home",
                        name: "首页",
                        spanClass: {
                            fa: true,
                            "fa-home": true,
                            "fa-lg": true
                        }
                    },
                    {
                        path: "/problem",
                        name: "题库",
                        spanClass: {
                            fa: true,
                            "fa-book": true,
                            "fa-lg": true
                        }
                    },
                    // { path: "/contest", name: "比赛" },
                    {
                        path: "/user",
                        name: "排名",
                        spanClass: {
                            fa: true,
                            "fa-user": true,
                            "fa-lg": true
                        }
                    },
                    {
                        path: "/solution",
                        name: "评测状态",
                        spanClass: {
                            fa: true,
                            "fa-pie-chart": true,
                            "fa-lg": true
                        }
                    },
                    {
                        path: "/contest",
                        name: "竞赛",
                        spanClass: {
                            fa: true,
                            "fa-fire": true,
                            "fa-lg": true
                        }
                    },
                    {
                        path: "/help",
                        name: "使用帮助",

                        spanClass: {
                            fa: true,
                            "fa-info-circle": true,
                            "fa-lg": true
                        }
                    }
                ]
            };
        },
        computed: mapState({
            user(state) {
                // console.log(state.user)
                const user = state.user
                if (user && user.role.match("ADMIN")) {
                    this.routes.push({
                        path: "/admin",
                        name: "Admin",
                        spanClass: {
                            fa: true,
                            "fa-info-circle": true,
                            "fa-lg": true
                        }
                    })

                }
                return state.user;
            }
        }),
        methods: {
            goto(path) {
                this.$router.push(path);
            },
            isCurrent(path) {
                var regExp = new RegExp(path);
                // console.log(regExp.test(this.$route.path))
                return regExp.test(this.$route.path);
            },
            logout() {
                logout()
                    .then(() => {
                        // console.log(res);
                        this.goto("/login");
                    })
                    .catch(err => {
                        console.log(err);
                        this.goto("/login");
                    });
            }
        }
    };
</script>
<style>
    /* @charset "UTF-8"; */
    /* ====== top bar =========*/
    /*图标*/
    .fixed-top .navbar-nav-svg {
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
        vertical-align: text-top;
    }

    .navbar.fixed-top {
        min-height: 4rem;
        background-color: #24292e;
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05),
        inset 0 -1px 0 rgba(0, 0, 0, 0.1);
    }

    .fixed-top .navbar-nav .nav-link.active {
        font-weight: 600;
    }

    /*登录 注册btn*/
    /*.btn-bd-download {*/
    /*  font-weight: 600;*/
    /*  color: #fff;*/
    /*  border-color: #fff;*/
    /*}*/
    /* ====== top bar =========*/
</style>