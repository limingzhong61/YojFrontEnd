<template>
  <div class="container update">
    <div class="py-3 text-center">
      <h2>修改信息</h2>
    </div>
    <div class="row">
      <div class="col-md-8 order-md-1 offset-md-2">
        <form class="needs-validation" novalidate>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="userName">用户名:</label>
            </div>
            <input
              type="text"
              :class="{'form-control': true,'is-invalid': !userNameJudge,'is-valid': userNameJudge}"
              id="userName"
              v-model="userName"
              placeholder
              required="required"
            />
            <div class="invalid-feedback">{{userNameMsg}}</div>
<!--            <button class="ml-3 btn btn-primary" type="bottom">&emsp;更新&emsp;</button>-->
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="nickName">昵称:</label>
            </div>
            <input
              type="text"
              :class="{'form-control': true,'is-invalid': !userNameJudge,'is-valid': userNameJudge}"
              id="nickName"
              v-model="nickName"
              placeholder
              required="required"
            />
            <div class="invalid-feedback">{{userNameMsg}}</div>
<!--            <button class="ml-3 btn btn-primary" type="bottom">&emsp;更新&emsp;</button>-->
          </div>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="email">Email:</label>
            </div>
            <input
              type="email"
              :class="{'form-control': true,'is-invalid': !emailJudge,'is-valid': emailJudge}"
              id="email"
              v-model="email"
              placeholder="you@example.com"
            />
            <div class="invalid-feedback">{{emailMsg}}</div>
          </div>
          <hr class="mb-3 mt-0" />
          <div style="display: flex; justify-content: center;">
            <button class="btn btn-primary btn-lg" type="bottom">&emsp;更新&emsp;</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../../../api/requeset/ajax";
export default {
  data() {
    return {
      userName: "",
      userNameJudge: true,
      userNameMsg: "",

      nickName: "",

      email: "",
      emailJudge: true,
      emailMsg: "",

      emailCode: "",
      emailCodeJudge: true,
      emailCodeMsg: "",
      headers: {},
      maxTime: 60,

      imageCode: "",
      imageCodeJudge: true,
      imageCodeMsg: ""
    };
  },
  methods: {},
  created() {
    // console.log("in");
    request({
      url: "/user/currentInfo",
      method: "get"
    })
      .then(res => {
        // console.log(res);
        // console.log(result.extend.pageInfo.list)
        this.user = res.data.extend.user;
        const user = res.data.extend.user;
        console.log(user);
        for (var field in user) {
          // console.log(field)
          this.$data[field] = user[field];
        }

        // this.countAccepted = res.data.extend.accepted;
        // this.countSubmission = res.data.extend.submission;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
  .input-group-text {
    background-color: #e9ecef40;
    width: 9rem;
    text-align: center;
    display: inline-block;
  }

  .invalid-feedback {
    text-align: center;
  }
</style>