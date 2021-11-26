<template>
  <main>
    <div class="chartjs-size-monitor">
      <div class="chartjs-size-monitor-expand">
        <div class=""></div>
      </div>
      <div class="chartjs-size-monitor-shrink">
        <div class=""></div>
      </div>
    </div>

    <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">题目管理</h1>
<!--      <div class="btn-toolbar mb-2 mb-md-0">-->
<!--        <div class="btn-group mr-2">-->
<!--          <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>-->
<!--          <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>-->
<!--        </div>-->
<!--        <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">-->
<!--          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"-->
<!--               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"-->
<!--               class="feather feather-calendar">-->
<!--            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>-->
<!--            <line x1="16" y1="2" x2="16" y2="6"></line>-->
<!--            <line x1="8" y1="2" x2="8" y2="6"></line>-->
<!--            <line x1="3" y1="10" x2="21" y2="10"></line>-->
<!--          </svg>-->
<!--          This week-->
<!--        </button>-->
<!--      </div>-->
    </div>
    <div>
      <div class="container-md my-set pt-3 px-5">
        <div class="row">
          <div class="col-md-12 order-md-1">
            <!--                <button type="button" class="btn btn-primary mb-1" @click="toAdd">添加题目</button>-->
            <div class="col-12 mx-auto">
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
                  <button @click="toPage(1)" class="btn btn-primary" type="button" id="button-addon2">
                    <!-- <span class="fa fa-search fa-lg text-secondary"></span> -->
                    Go
                  </button>
                </div>
              </div>
            </div>
            <MyTabel :pageInfo="pageInfo" @toPage="toPage">
              <thead class="thead-light" slot="thead">
              <tr>
                <th scope="col">PID</th>
                <th scope="col">状态</th>
                <th scope="col">名称</th>
                <th scope="col">
                  <span class="fa fa-tags fa-lg text-secondary"></span>
                  标签
                </th>
                <th scope="col">操作</th>
              </tr>
              </thead>
              <tbody slot="tbody">
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
                <td>
                  {{item.tag}}
                </td>
                <td>
                  <div class="btn-group">
                    <button type="button" class="btn btn-danger">信息操作</button>
                    <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split"
                            data-toggle="dropdown" aria-expanded="false">
                      <span class="sr-only">Toggle Dropdown</span>
                    </button>
                    <div class="dropdown-menu">
                      <router-link class="dropdown-item" :to="'/problem/alter/' + item.problemId"><span class="fa fa-edit fa-lg"></span>编辑</router-link>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" @click="deleteProblem(item.problemId)"><span class="fa fa-times fa-lg"></span>删除</a>
                    </div>
                  </div>
                </td>
              </tr>
              </tbody>
            </MyTabel>
          </div>
        </div>
      </div>

    </div>
    <div>
      <div class="row">
        <div class="col-md-8 order-md-1 offset-md-2">
          <form class="needs-validation" novalidate>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="userName">更新所有问题文件</label>
              </div>
              <button type="button" class="btn btn-primary" @click="updateAllProblemFile">确定</button>
            </div>
            <div class="input-group mb-3">
              <router-link type="button" class="btn btn-primary" href="#" to="/problem/add">添加问题</router-link>
            </div>
          </form>
        </div>
      </div>
<!--      <div class="py-3 text-center">-->
<!--        <h3>-->
<!--          <router-link href="#" to="/problem/add" class="d-flex justify-content-center">添加问题</router-link>-->
<!--        </h3>-->
<!--      </div>-->
    </div>
  </main>

</template>

<script>
import {deleteProblem, getProblemSet, updateAllProblemFile} from "../../../../api/requeset";
import Swal from 'sweetalert2'
import {ROLE_NAME} from "@/api/static";
import MyTabel from "@/components/Table/MyTable";
import $ from "jquery";

export default {
  name: "Problem",
  data() {
    return {
      problemId: null,
      title: null,
      problemList: [],
      pageInfo: {},
      add: false
    }
  }, methods: {
    deleteProblem(delProblemId) {
      Swal.fire({
        title: '你确定删除该问题吗?',
        text: "执行操作后，你将不能恢复到之前的状态!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '是的，删除它!',
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.value) {
          deleteProblem(delProblemId).then(res => {
                if (res.success) {
                  Swal.fire(
                      'Deleted!',
                      'Your file has been deleted.',
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
    updateAllProblemFile() {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          updateAllProblemFile().then(res => {
                if (res.success) {
                  Swal.fire(
                      'Deleted!',
                      'Your file has been deleted.',
                      'success'
                  )
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
    toPage(index) {
      this.$route.query.pageNumber = index
      // console.log("topage"+index);
      this.elderProblemId = this.problemId;
      this.elderTitle = this.title;
      getProblemSet(index, {
        problemId: this.problemId,
        title: this.title
      })
          .then(res => {
            // console.log(res);
            const data = res;
            this.problemList = res.extend.pageInfo.list;
            this.pageInfo = res.extend.pageInfo;
            this.add = data.add;
          })
          .catch(err => {
            console.log(err);
          });
    },
    toAdd() {
      if (this.user != null && this.user.role === ROLE_NAME.ADMIN) {
        this.$router.push('/problem/add')
      } else {
        Swal.fire({
          title: "你没有添加题目的权限",
          icon: "warning"
        });
      }
    },
  },
  components: {
    MyTabel
  },
  created() {
    this.toPage(1);
  },
  updated() {
    $('[data-toggle="tooltip"]').tooltip();
    // console.log('update')
  }
}
</script>

<style scoped>

</style>