<template>
  <div id="app" class="container" style="margin-top: 80px;">
    <div class="row">
      <div class="col-md-12 order-md-1">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h2 class="panel-title">评测状态</h2>
          </div>

          <div class="col-md-12 order-md-1">
            <table class="table table-hover table-bordered">
              <thead class="thead-light">
                <tr>
                  <th class="thodd">提交序号</th>
                  <th class="theven">用户名</th>
                  <th class="thodd">试题名称</th>
                  <th class="theven" style="vertical-align: middle;">提交时间</th>
                  <!-- 		<th class="thodd">代码长度</th> -->
                  <th class="theven" style="padding: 0px;">
                    <select
                      id="langsel"
                      style="border: 0px; padding: 8px; font-weight: bold;"
                      onchange="langselChange()"
                    >
                      <option value="langall">语言</option>
                      <option value="langc">C</option>
                      <option value="langcpp">C++</option>
                      <option value="langjava">JAVA</option>
                    </select>
                  </th>
                  <th class="thodd" style="padding: 0px;">
                    评测结果
                    <!-- 								<select id="retsel" -->
                    <!-- 									style="border: 0px; padding: 8px; font-weight: bold;"> -->
                    <!-- 										评测结果 -->
                    <!-- 										<option value="retall">评测结果</option> -->
                    <!-- 										<option value="retcorrect">正确</option> -->
                    <!-- 										<option value="retwrong">错误</option> -->
                    <!-- 										<option value="retce">编译出错</option> -->
                    <!-- 										<option value="retre">运行错误</option> -->
                    <!-- 										<option value="rettle">运行超时</option> -->
                    <!-- 										<option value="retmle">内存超限</option> -->
                    <!-- 										</select> -->
                  </th>
                  <!-- 								<th class="theven" style="padding: 0px;"><select -->
                  <!-- 									id="scoresel" -->
                  <!-- 									style="border: 0px; padding: 8px; font-weight: bold;" -->
                  <!-- 									onchange="scoreselChange()"> -->
                  <!-- 										<option value="scoreall">得分</option> -->
                  <!-- 										<option value="score100">100</option> -->
                  <!-- 										<option value="score199">1~99</option> -->
                  <!-- 										<option value="score0">0</option> -->
                  <!-- 								</select></th> -->
                  <th class="thodd" th:text="运行时间">
                    CPU使用
                    <div class="updown">
                      <a class="up" href="###" onclick="cputimeup()"></a>
                      <a class="down" href="###" onclick="cputimedown()"></a>
                    </div>
                  </th>
                  <th class="theven">
                    内存使用
                    <div class="updown">
                      <a class="up" href="###" onclick="memuseup()"></a>
                      <a class="down" href="###" onclick="memusedown()"></a>
                    </div>
                  </th>
                  <th class="theven">
                    评测详情
                    <div class="updown">
                      <a class="up" href="###" onclick="memuseup()"></a>
                      <a class="down" href="###" onclick="memusedown()"></a>
                    </div>
                  </th>
                  <!-- 								<th class="thodd">评测详情</th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in solutionList" :key="item.problemId">
                  <td>{{item.solutionId}}</td>
                  <td>{{item.user.userName}}</td>
                  <td>
                    <a :href="'/p/'+item.problem.problemId">{{item.problem.title}}</a>
                  </td>
                  <td>{{item.submitTime.substr(0, 10) + ' ' +item.submitTime.substr(11, 8)}}</td>

                  <td>{{item.languageStr}}</td>
                  <td>{{item.resultStr}}</td>
                  <td>{{item.runtime ? item.runtime + 'ms' : " " }}</td>
                  <td>{{item.memory ? item.memory / 10 + "KB" : " "}}</td>
                  <td>
                    <a href="#">敬请期待</a>
                  </td>
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
    </div>

    <!--引入footer-->
    <footer th:replace="commons/bar::footer"></footer>
  </div>
</template>

<script>
import request from "../../api/ajax.js";
export default {
  data() {
    return {
      solutionList: [],
      // pageInfo.pageNum 当前页号
      pageInfo: {},
      // pageNumber: 1,
      // totalRecord: 0,
      // currentPage: 1,
      navigatepageNums: []
    };
  },
  methods: {
    toPage(index) {
      request({
        url: "/s/set/" + index
      })
        .then(res => {
          console.log(res);
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
  mounted() {
    this.toPage(1);
  }
};
</script>
<style>
</style>