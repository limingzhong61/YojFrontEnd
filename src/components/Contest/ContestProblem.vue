<template>
  <div class="col-md-12 order-md-1">
    <!--                <button type="button" class="btn btn-primary mb-1" @click="toAdd">添加比赛</button>-->
    <MyTabel :pageInfo="pageInfo" @toPage="toPage">
      <thead class="thead-light" slot="thead">
      <tr>
        <!--        题目编号	标题	来源/分类	解决	提交-->
        <th scope="col">题目序号</th>
        <th scope="col">PID</th>
        <th scope="col">问题名称</th>
<!--        <th scope="col">  分数  </th>-->
<!--        <th scope="col">来源/分类</th>-->
<!--        <th scope="col">解决</th>-->
<!--        <th scope="col">提交</th>-->
      </tr>
      </thead>
      <tbody slot="tbody">
      <tr v-for="(item,index) in contestProblemList" :key="index">
        <th scope="row">{{ index + 1 }}</th>
        <td><a href="#" @click.prevent="toProblemView(item.problemId)">{{ item.problemId }}</a>
        <td><a href="#" @click.prevent="toProblemView(item.problemId)">{{ item.title }}</a>
        </td>
<!--        <td>{{ item.score }}</td>-->
      </tr>
      </tbody>
    </MyTabel>
  </div>
</template>

<script>
import {getContestProblem} from "@/api/requeset";
import MyTabel from "../../components/Table/MyTable.vue";
// import {mapState} from "vuex";


export default {
  name: "ContestProblem.Vue",
  data() {
    return {
      pageInfo: {},
      contestProblemList: [],
      contestId: 0,
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
      getContestProblem(pageNumber, contestId).then(res => {
        this.pageInfo = res.extend.pageInfo;
        this.contestProblemList = this.pageInfo.list;
        console.log(res)
        console.log("upup")
      }).catch(error => {
        console.log(error)
      })
    },
    toProblemView(problemId) {
      this.$router.push({
        path: '/problem/view/' + problemId,
        query: {
          contestId: this.contestId
        }
      })
    }
  }, created() {
    // console.log(this.$route)
    // problemId: this.$route.params.id,
    //     contestId: this.$route.query.contestId,
    this.contestId= this.$route.params.id
    // console.log(id)
    this.toPage(1, this.contestId)
  }

}
</script>

<style scoped>

</style>