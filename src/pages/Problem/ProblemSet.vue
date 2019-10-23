<template>
  <div id="app" class="container" style="margin-top: 80px;">
    <div class="row">
      <div class="col-md-12 order-md-1">
        <router-link to="/problem/add">添加题目</router-link>
        <table class="table table-hover table-bordered text-center">
          <!---->
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
                 <span v-if="item.state > 0" class="fa fa-check fa-lg text-success"></span>
                 <span v-else-if="item.state < 0" class="fa fa-close fa-lg text-danger"></span>
                 <span v-else class="fa fa-circle-o fa-lg text-warning"></span>
                 
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
          <div class="col-md-6" id="page-info-area">
            当前{{pageInfo.pageNum}}页，总
            {{pageInfo.pages}}页，共
            {{pageInfo.total}}条记录
          </div>
          <!-- 分页条信息 -->
          <nav aria-label="Page navigation example" id="page_nav_area">
            <ul class="pagination">
              <li :class="{'page-item': true, disable: !pageInfo.hasPreviousPage}">
                <a class="page-link" href="#" @click.prevent="toPage(1)">首页</a>
              </li>
              <li :class="{'page-item': true,disable: !pageInfo.hasPreviousPage}">
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

              <li class="page-item disable: !pageInfo.hasNextPage}">
                <a
                  class="page-link"
                  href="#"
                  @click.prevent="pageInfo.hasNextPage && toPage(pageInfo.pageNum + 1)"
                >»</a>
              </li>
              <li :class="{'page-item': true, disable: !pageInfo.hasNextPage}">
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
export default {
  data() {
    return {
      problemList: [],
      pageInfo: {},
      navigatepageNums: []
    };
  },
  methods: {
    toPage(index) {
      // console.log("topage");
      request({
        url: "/problem/getProblemSet/" + index
      })
        .then(res => {
          console.log(res);
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
  }
};
</script>

<style>
</style>