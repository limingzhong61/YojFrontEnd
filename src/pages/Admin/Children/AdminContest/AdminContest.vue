<template>
  <div>
    <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">比赛管理</h1>
    </div>
    <div class="container my-set pt-3 px-5">
      <div class="row">
        <div class="col-md-12 order-md-1">
          <!--                <button type="button" class="btn btn-primary mb-1" @click="toAdd">添加比赛</button>-->
          <div class="col-12 mx-auto">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">比赛名称</span>
              </div>
              <input
                  model="username"
                  type="text"
                  class="form-control"
                  placeholder="比赛名称"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
              />
              <div class="input-group-append ml-2">
                <button
                    @click="toPage(1)"
                    class="btn btn-outline-secondary"
                    type="button"
                >Go
                </button>
              </div>
            </div>
          </div>
          <MyTabel :pageInfo="pageInfo" @toPage="toPage">
            <thead class="thead-light" slot="thead">
            <tr>
              <th scope="col">CID</th>
              <th scope="col">名称</th>
              <th scope="col">状态</th>
              <th scope="col">开始时间</th>
              <th scope="col">结束时间</th>
              <th scope="col">题数</th>
              <th scope="col">创建者</th>
              <th scope="col">操作</th>
            </tr>
            </thead>
            <tbody slot="tbody">
            <tr v-for="(item) in contestProblemList" :key="item.contestId">
              <th scope="row">{{ item.contestId }}</th>
              <td>
                <router-link :to="'/contest/view/' + item.contestId">{{ item.title }}</router-link>
              </td>
              <td>{{ status(item.startTime, item.endTime) }}</td>
              <td>{{ item.startTime | timeFilter }}</td>
              <td>{{ item.endTime | timeFilter }}</td>
              <td>{{ item.totalProblem }}</td>
              <td>
                <router-link :to="'/user/info/' + item.userId">{{ item.username }}1</router-link>
              </td>
              <td>
                <div class="btn-group">
                  <button type="button" class="btn btn-danger">信息操作</button>
                  <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split"
                          data-toggle="dropdown" aria-expanded="false">
                    <span class="sr-only">Toggle Dropdown</span>
                  </button>
                  <div class="dropdown-menu">
                    <router-link class="dropdown-item" :to="'/contest/alter/' + item.contestId"><span
                        class="fa fa-edit fa-lg"></span>编辑
                    </router-link>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" @click="deleteContest(item.contestId)"><span
                        class="fa fa-times fa-lg"></span>删除</a>
                  </div>
                </div>
              </td>
            </tr>
            </tbody>
          </MyTabel>
        </div>
      </div>
    </div>
    <div class="py-3 text-center">
      <h3>
        <router-link href="#" to="/contest/add" class="d-flex justify-content-center">添加比赛</router-link>
      </h3>
    </div>
  </div>
</template>

<script>
import MyTabel from "@/components/Table/MyTable";
import {mapState} from "vuex";
import {ROLE_NAME} from "@/api/static";
import Swal from "sweetalert2";
import {deleteContest, getContestList} from "@/api/requeset";

export default {
  name: "AdminContest",
  data() {
    return {
      pageInfo: {},
      contestProblemList: [],
    }
  },
  components: {
    MyTabel
  }, computed: mapState({
    user(state) {
      return state.user;
    }
  }),
  methods: {
    deleteContest(delProblemId) {
      Swal.fire({
        title: '你确定删除该比赛吗?',
        text: "执行操作后，你将不能恢复到之前的状态!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '是的，删除它!',
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.value) {
          deleteContest(delProblemId).then(res => {
                if (res.success) {
                  Swal.fire(
                      '删除成功!',
                      '该比赛已经被成功删除',
                      'success'
                  )
                  this.toPage(1)
                } else {
                  Swal.fire(
                      'Fail!',
                      "Your problem hasn't been deleted.",
                      'error'
                  )
                }

              }
          ).catch(error => {
            console.log(error)
            Swal.fire(
                'Fail!',
                "Your problem hasn't been deleted.",
                'error'
            )
          })
        }
      })
    },
    toAdd() {
      if (this.user != null && this.user.role === ROLE_NAME.ADMIN) {
        this.$router.push('/contest/add')
      } else {
        Swal.fire({
          title: "你没有添加题目的权限",
          icon: "warning"
        });
      }
    },
    toPage(pageNumber) {
      getContestList(pageNumber, {contestId: 1}).then(res => {
        this.pageInfo = res.extend.pageInfo;
        this.contestProblemList = this.pageInfo.list;
      }).catch(error => {
        console.log(error)
      })
    }, status(startTime, endTime) {
      let start = Date.parse(startTime)
      let end = Date.parse(endTime)
      let now = Date.parse(new Date())
      // console.log(now)
      if (now > end) {
        return "已结束"
      } else if (now > start) {
        return "进行中"
      } else {
        return "未开始"
      }
    }
  },
  created() {
    this.toPage(1)
  }
}
</script>

<style scoped>

</style>