<template>
  <div class="container register">
    <div class="py-3 text-center">
      <img
        class="d-block mx-auto mb-3"
        src="../../../assets/images/astronaut.jpg"
        alt
        width="72"
        height="72"
      />
      <h2>找回密码</h2>
      <router-link href="#" to="/login" class="d-flex justify-content-center">已有账号，快去登录</router-link>
      <p>请输入你的账号邮箱地址，以便找回密码</p>
    </div>
    <JudgePassword v-model="passwordJudge"></JudgePassword>

    <!--加载图片model-->
    <div class="container">
      <div
        id="myModal"
        class="modal"
        data-keyboard="false"
        data-backdrop="static"
        data-role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div id="loading" class="loading">发送邮件中。。。</div>
      </div>
    </div>
  </div>
</template>

<script>
import JudgePassword from "../../../components/user/JudgePassword/JudgePassword.vue";
import request from "../../../api/ajax.js";
import $ from "jquery";
export default {
  components: {
    JudgePassword
  },
  data() {
    return {
      passwordJudge: {
        password: "",
        strength: 0
      },

      email: "",
      emailJudge: false,
      emailMsg: "",

      emailCheckCode: "",
      emailCheckJudge: true,
      emailCheckMsg: "",
      headers: {},
      maxTime: 60
    };
  },
  methods: {
    countDown(maxTime, emailBtn) {
      var countDownVar = window.setInterval(() => {
        if (maxTime == 0) {
          emailBtn.disabled = "";
          emailBtn.innerHTML = "获取验证码";
          clearInterval(countDownVar);
        } else {
          emailBtn.disabled = "disabled";
          emailBtn.innerHTML = maxTime + "秒后重新获取";
          maxTime--;
        }
      }, 1000);
    },
    sendEmail() {
      if (!this.emailJudge) {
        return;
      }
      $("#myModal").modal("show");
      request({
        url: "/user/r/getEmailCheckCode/" + this.email
      })
        .then(res => {
          $("#myModal").modal("hide");
          // console.log(res)
          this.emailJudge = res.data.success;
          if (res.data.success) {
            this.$options.methods.countDown(5, this.$refs.emailBtn);
          } else {
            this.emailMsg = res.data.msg;
          }
        })
        .catch(err => {
          console.log(err);
          $("#myModal").modal("hide");
        });
    },
    resetPassword() {
      if (!this.emailJudge) {
        return;
      }
      console.log(this.password);
      // console.log(this.headers);
      request({
        url: "#",
        method: "POST",
        data: {
          userName: this.userName,
          password: this.password,
          email: this.email,
          emailCheckCode: this.emailCheckCode
          //  headers: this.headers
        }
      })
        .then(res => {
          // console.log(res);
          if (res.data.success) {
            this.$router.replace("/login");
          } else {
            for (var obj in res.extend) {
              this[obj] = false;
            }
            // console.log('error')
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {
    email: function(value) {
      var emailReg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/i;
      this.emailJudge = emailReg.test(value);
      if (!this.emailJudge) {
        this.emailMsg = "请输入一个有效的电子邮件地址.";
        return;
      }
      request({
        url: "/user/r/validateEmail/" + value
      })
        .then(res => {
          // console.log(res);
          res = res.data;
          this.emailJudge = res.success;
          if (this.emailJudge) {
            this.emailMsg = "";
          } else {
            this.emailMsg = res.msg;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    // var csrfHeader = this.$("meta[name='_csrf_header']").attr("content");
    // var csrfToken = this.$("meta[name='_csrf']").attr("content");
    // var headers = {};
    // headers[csrfHeader] = csrfToken;
    // this.headers = headers;
  }
};
</script>
<style>
</style>