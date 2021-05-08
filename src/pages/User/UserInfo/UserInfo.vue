<template>
  <div class="container" style="margin-top: 80px;">
    <!-- <h2 class="panel-title mb-4 text-center">个人信息</h2> -->
    <div class="row mx-5 mb-3">
      <div class="col-3 order-md-1">
        <img class="user-img ml-auto" :src="appApi+'/image/avatar/'+this.$route.params.id +'.jpg'"/>
      </div>
      <div class="col-3 order-md-2 mt-auto">
        <p class="font-weight-bold">用户名：{{ user.username }}</p>
        <p class="font-weight-bold">昵称：{{ user.nickName }}</p>
      </div>
      <!-- 问题表 -->
      <div class="col-5 order-md-3 mt-auto">
        <!-- ml-auto mr-5 pr-5 -->
        <table class="table table-bordered text-center">
          <thead class="thead-light">
          <tr>
            <th>解决问题</th>
            <th>尝试问题</th>
            <th>通过评测</th>
            <th>提交评测</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <a @click.prevent="toSolution(0)" href="#">{{ user.solved }}</a>
            </td>
            <td>
              <a @click="toSolution(null)" href="#">{{ user.attempted }}</a>
            </td>
            <td>
              <a @click.prevent="toSolution(0)" href="#">{{ user.accepted }}</a>
            </td>
            <td>
              <a @click.prevent="toSolution()" href="#">{{ user.submissions }}</a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="card shadow p-3 mb-5 bg-white rounded mx-5">
      <dl class="row text-left px-5">
        <dt class="col-3 font-weight-bold">个性签名：</dt>
        <dd class="col-9 md-3">{{ user.intro }}</dd>
        <dt class="col-3 font-weight-bold">注册时间：</dt>
        <dd class="col-9 md-3">{{ user.regTime | timeFilter }}</dd>
        <dt class="col-3 font-weight-bold">用户名：</dt>
        <dd class="col-9 md-3">{{ user.username }}</dd>
        <dt class="col-3 font-weight-bold">Email:</dt>
        <dd class="col-9">{{ user.email }}</dd>
      </dl>
    </div>
  </div>
</template>

<script>
import {getUserInfo} from "../../../api/requeset";
import LoadImage from "@/components/Img/LoadImage";

export default {
  components: {LoadImage},
  data() {
    return {
      countAccepted: 0,
      countSubmission: 0,
      user: {username: ""},
      appApi: process.env.VUE_APP_BASE_API,
    };
  },
  // computed: mapState(["user"]),
  methods: {
    toSolution(result) {
      this.$router.push({
        path: "/solution",
        query: {username: this.user.username, result: result}
      });
    }
  },
  created() {
    // console.log("in");
    getUserInfo(this.$route.params.id)
        .then(res => {
          this.user = res.extend.user;
          console.log(this.user)
        })
        .catch(err => {
          console.log(err);
        });
  }
};
</script>
<style>
.user-img {
  width: 10rem;
}
</style>