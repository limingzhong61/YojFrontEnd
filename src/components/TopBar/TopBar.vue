<template>
  <header class="navbar navbar-dark navbar-expand-sm fixed-top">
    <!-- <a class="navbar-brand" href="#">
      <img
        src="../../assets/images/bootstrap-solid.svg"
        width="30"
        height="30"
        class="d-inline-block align-top"
        alt
      />
      YOJ
    </a>-->
    <a class="navbar-brand" href="#">
      <span class="fa fa-yahoo fa-lg text-primary"></span>
      <!-- <span class="fa fa-opera fa-lg text-primary"></span> -->
      YOJ
    </a>
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
            <span :class="item.spanClass"></span>{{item.name}}
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="https://github.com/Li-MingZhong/yoj"
            title="GitHub"
          >
            <span class="fa fa-github fa-lg text-secondary"></span>
          </a>
        </li>
        <!--<li class="nav-item dropdown">-->
        <!--<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">-->
        <!--Dropdown-->
        <!--</a>-->
        <!--<div class="dropdown-menu" aria-labelledby="navbarDropdown">-->
        <!--<a class="dropdown-item" href="#">Action</a>-->
        <!--<a class="dropdown-item" href="#">Another action</a>-->
        <!--<div class="dropdown-divider"></div>-->
        <!--<a class="dropdown-item" href="#">Something else here</a>-->
        <!--</div>-->
        <!--</li>-->
        <!--<li class="nav-item">-->
        <!--<a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>-->
        <!--</li>-->
      </ul>
      <!--<form class="form-inline my-2 my-lg-0">-->
      <!--<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">-->
      <!--<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>-->

      <!-- ===============个人按钮  ==================== -->
      <ul class="navbar-nav flex-row ml-sm-auto d-none d-sm-flex" v-if="user">
        <li class="nav-item dropdown">
          <a
            class="nav-item nav-link dropdown-toggle mr-sm-2"
            href="#"
            id="bd-versions"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            sec:authentication="name"
          >
            <span class="fa fa-user-circle-o fa-lg text-primary" aria-label="GitHub"></span>
            {{user.userName}}
          </a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="bd-versions">
            <router-link tag="a" :to="'/user/info/'+user.userId" class="dropdown-item" href="#">个人信息</router-link>
            <div class="dropdown-divider"></div>
            <form action="http://localhost:8080/logout" method="post">
              <button class="dropdown-item" type="submit">退出</button>
            </form>
            <!--<a class="dropdown-item" th:href="@{/logout}">退出</a>-->
            <!--<a class="dropdown-item active" href="/docs/4.0/">v4.0.0</a>-->
            <!--<div class="dropdown-divider"></div>-->
            <!--<a class="dropdown-item" href="https://v4-alpha.getbootstrap.com/">v4 Alpha 6</a>-->
            <!--<a class="dropdown-item" href="https://getbootstrap.com/docs/3.3/">v3.3.7</a>-->
            <!--<a class="dropdown-item" href="https://getbootstrap.com/2.3.2/">v2.3.2</a>-->
          </div>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
import request from "../../api/ajax";
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
          name: "用户",
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
        }
      ]
    };
  },
  computed: mapState({
    user(state) {
      // console.log(state.user)
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
      request({
        url: "/user/logout"
      })
        .then(res => {
          // console.log(res);
          res.data = "";
          this.goto("/login");
        })
        .catch(err => {
          console.log(err);
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
.btn-bd-download {
  font-weight: 600;
  color: #fff;
  border-color: #fff;
}
/* ====== top bar =========*/
</style>