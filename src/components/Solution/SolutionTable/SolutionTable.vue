<template>
  <div class="col-12 order-md-1">
    <div class="col-10 offset-1">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">用户名</span>
        </div>
        <input
          v-model="userName"
          type="text"
          class="form-control"
          placeholder="请输入正确的用户名"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
        />
        <div class="input-group-prepend ml-3">
          <span class="input-group-text">问题ID</span>
        </div>
        <input
          v-model="problemId"
          type="text"
          class="form-control"
          placeholder="请输入正确的问题ID"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
        />
        <div class="input-group-append ml-2">
          <button
            @click="toPage(1)"
            class="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >Go</button>
        </div>
      </div>
    </div>
    <MyTabel :pageInfo="pageInfo" @toPage="toPage">
      <thead class="thead-light" slot="thead">
        <tr class>
          <th class>提交序号</th>
          <th class>用户名</th>
          <th class>问题ID</th>
          <th class>
            <span class="fa fa-calendar-check-o fa-lg text-secondary"></span>
            提交时间
          </th>
          <th class>
            <select v-model="language" @change="toPage(1)" class="custom-select">
              <option value selected="selected">语言</option>
              <option :value="index" v-for="(item,index) in judgeLanguage" :key="index">{{item}}</option>
            </select>
          </th>
          <th class>
            <select v-model="result" @change="toPage(1)" class="custom-select">
              <option value selected="selected">评测状态</option>
              <option :value="index" v-for="(item,index) in judgeResult" :key="index">{{item}}</option>
            </select>
          </th>
          <th class th:text="运行时间">
            <span class="fa fa-clock-o fa-lg text-secondary"></span>
            CPU使用
          </th>
          <th class>
            <span class="fa fa-database fa-lg text-secondary"></span>
            内存使用
          </th>
          <th class>
            <span class="fa fa-file-code-o fa-lg text-secondary"></span>
            评测详情
          </th>
        </tr>
      </thead>
      <tbody slot="tbody">
        <tr class v-for="item in solutionList" :key="item.solutionId">
          <th scope="row">{{item.solutionId}}</th>
          <td>
            <router-link :to="'/user/info/' + item.userId">{{item.userName}}</router-link>
          </td>
          <td>
            <router-link
              :to="'/problem/view/' + item.problemId"
            >{{item.title ?item.title: item.problemId}}</router-link>
          </td>
          <td>{{item.submitTime | timeFilter}}</td>
          <td>{{judgeLanguage[item.language]}}</td>
          <td>
            <i class="fa fa-lg fa-spinner fa-spin" v-if="item.result == 9"></i>
            {{judgeResult[item.result]}}
          </td>
          <td>
            <i class="fa fa-lg fa-spinner fa-spin" v-if="item.result == 9"></i>
            {{item.runtime != null ? item.runtime + 'ms' : " " }}
          </td>
          <td>
            <i class="fa fa-lg fa-spinner fa-spin" v-if="item.result == 9"></i>
            {{item.memory ? item.memory / 10 + "KB" : " "}}
          </td>
          <td>
            <i class="fa fa-lg fa-spinner fa-spin" v-if="item.result == 9"></i>
            <router-link
              :to="'/solution/detail/'+item.solutionId"
              v-else-if="item.share || user.userId == item.userId"
              href="#"
            >评测详情</router-link>
            <a v-else>未分享</a>
          </td>
        </tr>
      </tbody>
    </MyTabel>
  </div>
</template>

<script>
import { getSolutionSet } from "../../../api/requeset";
import { JUDGE_RESULT, JUDGE_LANGUAGE } from "../../../api/static.js";
import { mapState } from "vuex";
import MyTabel from "../../../components/Table/MyTable.vue";
export default {
  data() {
    return {
      judgeResult: JUDGE_RESULT,
      judgeLanguage: JUDGE_LANGUAGE,
      userName: null,
      problemId: null,
      language: "",
      result: "",
      solutionList: [],
      pageInfo: {}
    };
  },
  methods: {
    toPage(index) {
      getSolutionSet(index, {
        userName: this.userName,
        problemId: this.problemId,
        result: this.result,
        language: this.language
      })
        .then(res => {
          // console.log(res);
          // console.log(result.extend.pageInfo.list)
          this.solutionList = res.data.extend.pageInfo.list;
          this.pageInfo = res.data.extend.pageInfo;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: mapState(["user"]),
  watch: {
    // language(){
    // }
  },
  components: {
    MyTabel
  },
  created() {
    this.userName = this.$route.query.userName;
    // console.log(this.$route.query.result)
    if (/\d/.test(this.$route.query.result)) {
      this.result = this.$route.query.result;
    }
    this.toPage(1);
  },
  beforeMount() {}
};
</script>
<style>
</style>