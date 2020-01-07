<template>
  <div class="container my-set pt-3 px-5">
    <div class="row">
      <div class="col-md-12 order-md-1">
        <div class="col-6 m-auto">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">用户名</span>
            </div>
            <input
              v-model="username"
              type="text"
              class="form-control"
              placeholder="用户名"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
            <div class="input-group-append ml-2">
              <button
                @click="toPage(1)"
                class="btn btn-outline-secondary"
                type="button"
              >Go</button>
            </div>
          </div>
        </div>
        <MyTabel :pageInfo="pageInfo" @toPage="toPage">
          <thead class="thead-light" slot="thead">
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">用户名</th>
              <th scope="col">昵称</th>
              <th scope="col">解决问题</th>
              <th scope="col">尝试问题</th>
              <th scope="col">通过</th>
              <th scope="col">提交</th>
            </tr>
          </thead>
          <tbody slot="tbody">
            <tr v-for="(item,index) in userList" :key="item.userId">
              <th scope="row">{{index+1}}</th>
              <td>
                <router-link :to="'/user/info/' + item.userId">{{item.username}}</router-link>
              </td>
              <td>{{item.nickName}}</td>
              <td>{{item.solved}}</td>
              <td>{{item.attempted}}</td>
              <td>{{item.accepted}}</td>
              <td>{{item.submissions}}</td>
            </tr>
          </tbody>
        </MyTabel>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserSet } from "../../../api/requeset";
import MyTabel from "../../../components/Table/MyTable.vue";
export default {
  data() {
    return {
      username: null,
      userList: [],
      pageInfo: {}
    };
  },
  methods: {
    toPage(index) {
      // console.log("topage");
      this.elderProblemId = this.problemId;
      this.elderTitle = this.title;
      getUserSet(index, {
        username: this.username
      })
        .then(res => {
          // console.log(res);
          // console.log(result.extend.pageInfo.list)
          this.userList = res.extend.pageInfo.list;
          this.pageInfo = res.extend.pageInfo;
          // console.log(vue.pageInfo)
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: {
    MyTabel
  },
  created() {
    this.toPage(1);
  },
  updated() {
    // $('[data-toggle="tooltip"]').tooltip();
  }
};
</script>

<style>
</style>