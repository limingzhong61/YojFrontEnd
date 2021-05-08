<template>
  <div class="container my-set pt-3 px-0">
    <div class="row">
      <div class="col-md-12 order-md-1">
        <div class="panel panel-default">
          <div class="w-100">
            <div class="container">
              <div class="input-group mb-3 col-12 mx-auto">
                <div class="input-group-prepend">
                  <span class="input-group-text">用户</span>
                </div>
                <input
                    v-model="nickName"
                    type="text"
                    class="form-control"
                    placeholder="请输入正确的用户"
                    aria-label="Recipient's nickName"
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
                    aria-label="Recipient's nickName"
                    aria-describedby="button-addon2"
                />
                <div class="input-group-append ml-2">
                  <button
                      @click="toPage(1)"
                      class="btn btn-outline-secondary"
                      type="button"
                      id="button-addon2"
                  >Go
                  </button>
                </div>
              </div>
            </div>
            <MyTabel :pageInfo="pageInfo" @toPage="toPage" class="table-txt-size">
              <thead class="thead-light" slot="thead">
              <tr class>
                <th class>SID</th>
                <th class>用户</th>
                <th class>问题ID</th>
                <th class>
                  <span class="fa fa-calendar-check-o fa-lg text-secondary"></span>
                  提交时间
                </th>
                <th class>
                  <select v-model="language" @change="toPage(1)" class="custom-select">
                    <option value selected="selected">语言</option>
                    <option :value="index" v-for="(item,index) in judgeLanguage" :key="index">
                      {{ item }}
                    </option>
                  </select>
                </th>
                <th class>
                  <select v-model="result" @change="toPage(1)" class="custom-select">
                    <option value selected="selected">评测状态</option>
                    <option :value="index" v-for="(item,index) in judgeResult" :key="index">
                      {{ item }}
                    </option>
                  </select>
                </th>
                <th class text="运行时间">
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
                <th scope="row">{{ item.solutionId }}</th>
                <td>
                  <router-link :to="'/user/info/' + item.userId">{{ item.nickName }}</router-link>
                </td>
                <td>
                  <router-link
                      :to="'/problem/view/' + item.problemId"
                  >{{ item.title ? item.title : item.problemId }}
                  </router-link>
                </td>
                <td>{{ item.submitTime | timeFilter }}</td>
                <td>{{ judgeLanguage[item.language] }}</td>
                <td>
                  <div :class="getResultClass(item.result)" style="font-size: 100%">
                    <i class="fa fa-lg fa-spinner fa-spin" v-if="item.result == 9"></i>
                    {{ judgeResult[item.result] }}
                  </div>
                </td>
                <td>
                  <i class="fa fa-lg fa-spinner fa-spin" v-if="item.result == 9"></i>
                  <button @click="reSubmit(item.solutionId)" class="btn btn-primary mb-1"
                          v-else-if="item.result == 10">提交重判
                  </button>
                  {{ formatResultTime(item.runtime,item.result) }}
                </td>
                <td>
                  <i class="fa fa-lg fa-spinner fa-spin" v-if="item.result == 9"></i>
                  {{ formatMemory(item.memory,item.result) }}
                </td>
                <td>
                  <i v-if="!user"><i class="fa fa-lg fa-lock"></i>需要登录</i>
                  <router-link
                      :to="'/solution/detail/'+item.solutionId"
                      v-else-if="item.share || user && user.userId == item.userId"
                      href="#"
                  >评测详情
                  </router-link>
                  <a v-else>未分享</a>
                </td>
              </tr>
              </tbody>
            </MyTabel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import MyTabel from "../../components/Table/MyTable";
import * as Swal from "sweetalert2";
import {getSolutionSet, reSubmitSolution} from "../../api/requeset";
import {JUDGE_LANGUAGE, JUDGE_RESULT} from "../../api/static";
import {formatMemory, formatRunTime} from "../../api/format";

export default {
  data() {
    return {
      judgeResult: JUDGE_RESULT,
      judgeLanguage: JUDGE_LANGUAGE,
      nickName: null,
      problemId: null,
      contestId: 0,
      language: "",
      solutionList: [],
      pageInfo: {},
      result: null,
    };
  },
  methods: {
    toPage(index) {
      getSolutionSet(index, {
        nickName: this.nickName,
        problemId: this.problemId,
        result: this.result,
        language: this.language,
        contestId: this.contestId
      })
          .then(res => {
            console.log(res);
            this.solutionList = res.extend.pageInfo.list;
            this.pageInfo = res.extend.pageInfo;
          })
          .catch(err => {
            console.log(err);
          });
    },
    getResultClass(result) {
      if (result == 0 || result == 1) {
        return "badge badge-success text-wrap"
      } else if (result == 4) {
        return "badge badge-danger text-wrap"
      } else if (result == 9) {
        return "badge badge-info text-wrap"
      } else {
        return "badge badge-warning text-wrap"
      }
    },
    reSubmit(sid) {
      reSubmitSolution(sid)
          .then(res => {
            if (res.success) {
              // this.$router.replace("/solution");
            } else {
              Swal.fire({
                title: res.msg,
                icon: "warning"
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
    },
    formatResultTime(time,result) {
      // console.log(result)
      //不正确无运行时间
      if(result != 0) return "--";
      return formatRunTime(time)
    },
    formatMemory(memory,result) {
      // console.log(result)
      //不正确,无运行内存
      if(result != 0) return "--";
      return formatMemory(memory)
    }
  },
  computed: mapState(["user"]),
  components: {
    MyTabel
  },
  created() {
    // console.log(this.$route)
    // problemId: this.$route.params.id,
    //     contestId: this.$route.query.contestId,
    this.contestId = this.$route.params.id
    // console.log(contestId)
    this.nickName = this.$route.query.nickName;
    this.nickName = this.$route.query.nickName;
    // console.log(this.$route.query.result)
    if (/\d/.test(this.$route.query.result)) {
      this.result = this.$route.query.result;
    }
    this.toPage(1);
  },
  beforeMount() {
  }
};
</script>
<style>
.table-txt-size {
  font-size: 0.95rem;
}
</style>