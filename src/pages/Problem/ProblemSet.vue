<template>
  <div id="app" class="container" style="margin-top: 80px;">
    <div class="row">
      <div class="col-md-12 order-md-1">
        <router-link to="/problem/add">添加题目</router-link>
        <div class="col-10 offset-1">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">PID</span>
            </div>
            <input
              v-model="problemId"
              type="text"
              class="form-control"
              placeholder="PID"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
            <div class="input-group-prepend ml-3">
              <span class="input-group-text">问题名称</span>
            </div>
            <input
              v-model="title"
              type="text"
              class="form-control"
              placeholder="问题名称"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
            <div class="input-group-append ml-2">
              <button @click="toPage(1)" class="btn btn-primary" type="button" id="button-addon2">Go</button>
            </div>
          </div>
        </div>
        <table class="table table-hover table-bordered text-center">
          <caption>
            当前{{pageInfo.pageNum}}页，总
            {{pageInfo.pages}}页，共
            {{pageInfo.total}}条记录
          </caption>
          <thead class="thead-light">
            <tr>
              <th scope="col">PID</th>
              <th scope="col">状态</th>
              <th scope="col">名称</th>
              <th scope="col">标签</th>
              <th scope="col">递交</th>
              <th scope="col">AC%</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in problemList" :key="item.problemId">
              <th scope="row">{{item.problemId}}</th>
              <td>
                <span
                  v-if="item.userSolved"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="已通过"
                  class="fa fa-check fa-lg text-success"
                ></span>
                <span
                  v-else-if="item.userSubmitted"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="未通过"
                  class="fa fa-close fa-lg text-danger"
                ></span>
                <span
                  v-else
                  data-toggle="tooltip"
                  data-placement="top"
                  title="未提交"
                  class="fa fa-circle-o fa-lg text-warning"
                ></span>
              </td>
              <td>
                <router-link :to="'/problem/view/' + item.problemId">{{item.title}}</router-link>
              </td>
              <td>入门</td>
              <td>{{item.submissions}}</td>
              <td>{{item.submissions ? Math.round(item.accepted / item.submissions * 100) + '%' : ''}}</td>
            </tr>
          </tbody>
        </table>
        <!-- information of devide page -->
        <div class="row">
          <div class="col-6"></div>
          <!-- 分页条信息 -->
          <nav aria-label="Page navigation example" id="page_nav_area">
            <ul class="pagination">
              <li :class="{'page-item': true,disabled: !pageInfo.hasPreviousPage}">
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

              <li :class="{'page-item':true,disabled: !pageInfo.hasNextPage} ">
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
      </div>
    </div>
  </div>
</template>

<script>
import request from "../../api/ajax.js";
import $ from "jquery";
// $(function () {

// })
export default {
  data() {
    return {
      problemId: null,
      title: null,

      problemList: [],
      pageInfo: {},
      navigatepageNums: []
    };
  },
  methods: {
    toPage(index) {
      // console.log("topage");
      this.elderProblemId = this.problemId;
      this.elderTitle = this.title;
      request({
        url: "/problem/getProblemSet/" + index,
        params: {
          problemId: this.problemId,
          title: this.title
        }
      })
        .then(res => {
          // console.log(res);
          // console.log(result.extend.pageInfo.list)
          this.problemList = res.data.extend.pageInfo.list;
          this.pageInfo = res.data.extend.pageInfo;
          this.navigatepageNums = res.data.extend.pageInfo.navigatepageNums;
          // console.log(vue.pageInfo)
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.toPage(1);
  },
  updated() {
    $('[data-toggle="tooltip"]').tooltip();
    // console.log('update')
  }
};
</script>

<style>
</style>