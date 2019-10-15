<template>
  <div class="container" style="margin-top: 80px;">
    <div class="row">
      <div class="col-md-12 order-md-1">
        <form class="form-signin" th:action="@{/user/login}" method="post">
          <img
            class="mb-4"
            src="../../assets/images/bootstrap-solid.svg"
            alt
            width="72"
            height="72"
          />
          <h1 class="h3 mb-3 font-weight-normal">请登录</h1>
          <!--判断-->
          <p th:if="${loginError}" style="color: red" class="error">用户名/密码错误</p>
          <label class="sr-only">用户名</label>
          <input
            type="text"
            name="userName"
            class="form-control"
            placeholder="用户名"
            required
            autofocus
            v-model="userName"
          />
          <label class="sr-only">密码</label>
          <input
            type="password"
            name="password"
            class="form-control"
            placeholder="密码"
            required
            v-model="password"
          />
          <div class="checkbox mb-3">
            <label>
              <input type="checkbox" name="remember" />记住我
            </label>
          </div>
          <button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="login">登录</button>
          <a class="btn btn-lg btn-primary btn-block" th:href="@{/user/register}">注册</a>
          <!--<a class="btn btn-sm" th:href="@{/index.html(l='zh_CN')}">中文</a>-->
          <!--<a class="btn btn-sm" th:href="@{/index.html(l='en_US')}">English</a>-->
        </form>
      </div>
    </div>
    <!--引入footer-->
    <footer th:replace="commons/bar::footer"></footer>
  </div>
</template>
<script>
// /user/login
// import request from "../../api/ajax";
import axios from 'axios'
export default {
  data() {
    return {
      userName: "",
      password: ""
    };
  },
  methods: {
    login() {
      const username = this.userName;
      const password = this.password;
      console.log(username + this.password);
      axios({
          url: "http://localhost:8080/user/login",
          method: "post",
              // res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
          // 封装JSON
          data: {
            username,
            password
          }
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style>
html,
container {
  height: 100%;
}

container {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
  /*background-color: #f5f5f5;*/
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}

.form-signin .form-control:focus {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>