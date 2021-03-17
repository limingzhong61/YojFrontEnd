<template>
  <div class="col-md-12 order-md-1">
    <!--                <button type="button" class="btn btn-primary mb-1" @click="toAdd">添加比赛</button>-->
    <MyTabel :pageInfo="pageInfo" @toPage="toPage">
      <thead class="thead-light" slot="thead">
      <tr>
        <!--        名次	用户	昵称	解决	累计时间	-->
        <th scope="col">名次</th>
        <th scope="col">用户</th>
        <th scope="col"> 解决</th>
        <th scope="col"> 累计时间</th>

      </tr>
      </thead>
      <tbody slot="tbody">
      <tr v-for="(item,index) in userList" :key="index">
        <th scope="row">{{ index + 1 }}</th>
        <td> <router-link :to="'/user/info/' + item.userId">{{ item.nickName }}</router-link></td>
        <td>{{ item.solved }}</td>
        <td>{{ item.totalRunTime}}ms</td>
      </tr>
      </tbody>
    </MyTabel>
  </div>
</template>

<script>
import MyTabel from "@/components/Table/MyTable";
import {getContestRank} from "@/api/requeset";

export default {
  name: "ContestRank", data() {
    return {
      pageInfo: {},
      userList: [],
    }
  }, components: {
    MyTabel
  },
// , computed: mapState({
//   // user(state) {
//   //   return state.user;
//   // }
// }),
  methods: {
    toPage(pageNumber, contestId) {
      getContestRank(pageNumber, contestId).then(res => {
        this.pageInfo = res.extend.pageInfo;
        this.userList = this.pageInfo.list;
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
    },
    toUser(problemId) {
      this.$router.push({
        path: '/problem/view/' + problemId,
        query: {
          contestId: this.contest.contestId
        }
      })
    }
  }, created() {
    // console.log(this.$route)
    // problemId: this.$route.params.id,
    //     contestId: this.$route.query.contestId,
    const contestId = this.$route.params.id
    // console.log(id)
    this.toPage(1, contestId)
  }
}
</script>

<style scoped>

</style>