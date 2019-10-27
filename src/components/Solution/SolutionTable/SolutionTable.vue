<template>
  <table class="col-12 order-md-1">
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
    <table class="table table-hover table-bordered text-center">
      <!-- information of devide page -->
      <caption>
        当前{{pageInfo.pageNum}}页，总
        {{pageInfo.pages}}页，共
        {{pageInfo.total}}条记录
      </caption>
      <thead class="thead-light">
        <tr class>
          <th class>提交序号</th>
          <th class>
            用户名
            <!-- <select v-model="userName" @change="toPage(1)" class="custom-select">
              <option value="null">用户名</option>
              <option value="lmz1">我</option>
            </select>-->
          </th>
          <th class>问题ID</th>
          <th class>
            <span class="fa fa-calendar-check-o fa-lg text-secondary"></span>
            提交时间
          </th>
          <th class>
            <select v-model="language" @change="toPage(1)" class="custom-select">
              <option value="null">语言</option>
              <option value="0">C</option>
              <option value="1">C++</option>
              <option value="2">JAVA</option>
              <option value="3">Python</option>
            </select>
          </th>
          <th class>
            <select v-model="result" @change="toPage(1)" class="custom-select">
              <option value="null" selected="selected">评测状态</option>
              <option value="0">Accepted</option>
              <option value="1">Presentation Error</option>
              <option value="2">Time Limit Exceeded</option>
              <option value="3">Memory Limit Exceeded</option>
              <option value="4">Wrong Answer</option>
              <option value="5">Runtime Error</option>
              <option value="6">Output Limit Exceeded</option>
              <option value="7">Compile Error</option>
              <option value="8">System Error</option>
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
      <tbody>
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
          <td>{{item.languageStr}}</td>
          <td>{{item.resultStr}}</td>
          <td>{{item.runtime != null ? item.runtime + 'ms' : " " }}</td>
          <td>{{item.memory ? item.memory / 10 + "KB" : " "}}</td>
          <td>
            <router-link :to="'/solution/detail/'+item.solutionId" href="#">评测详情</router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分页条信息 -->
    <div class="row">
      <div class="col-6"></div>
      <nav aria-label="navigation">
        <ul class="pagination">
          <li :class="{'page-item': true, disabled: !pageInfo.hasPreviousPage}">
            <a class="page-link" href="#" @click.prevent="toPage(1)">首页</a>
          </li>
          <li :class="{'page-item': true,disabled: !pageInfo.hasPreviousPage}">
            <a
              class="page-link"
              href="#"
              @click.prevent="pageInfo.hasPreviousPage && toPage(pageInfo.pageNum - 1)"
            >«</a>
          </li>

          <li
            :class="{'page-item': true,active: index == pageInfo.pageNum}"
            v-for="index in navigatepageNums"
            :key="index"
          >
            <a class="page-link" href="#" @click.prevent="toPage(index)">{{index}}</a>
          </li>

          <li :class="{'page-item':true, disabled: !pageInfo.hasNextPage}">
            <a
              class="page-link"
              href="#"
              @click.prevent="pageInfo.hasNextPage && toPage(pageInfo.pageNum + 1)"
            >»</a>
          </li>
          <li :class="{'page-item': true, disabled: !pageInfo.hasNextPage}">
            <a class="page-link" href="#" @click.prevent="toPage(pageInfo.pages)">末页</a>
          </li>
        </ul>
      </nav>
    </div>
  </table>
</template>

<script>
import request from "../../../api/ajax.js";
export default {
  data() {
    return {
      userName: null,
      problemId: null,
      language: null,
      result: null,

      solutionList: [],
      pageInfo: {},
      navigatepageNums: []
    };
  },
  methods: {
    toPage(index) {
      request({
        url: "/solution/set/" + index,
        method: "post",
        data: {
          userName: this.userName,
          problemId: this.problemId,
          result: this.result,
          language: this.language
        }
      })
        .then(res => {
          // console.log(res);
          // console.log(result.extend.pageInfo.list)
          this.solutionList = res.data.extend.pageInfo.list;
          this.pageInfo = res.data.extend.pageInfo;
          this.navigatepageNums = res.data.extend.pageInfo.navigatepageNums;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {
    // language(){
    // }
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