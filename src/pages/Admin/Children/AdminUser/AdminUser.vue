<template>
  <main>
    <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">用户管理</h1>
    </div>
    <div>
      <div class="container my-set pt-3 px-5">
        <div class="row">
          <div class="col-md-12 order-md-1">
            <div class="col-12 mx-auto m-auto">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">用户名</span>
                </div>
                <input
                    v-model="username"
                    type="text"
                    class="form-control"
                    placeholder="用户名"
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
                <th scope="col">序号</th>
                <th scope="col">用户ID</th>
                <th scope="col">用户名</th>
                <th scope="col">昵称</th>
                <th scope="col">电子邮箱</th>
                <th scope="col">注册时间</th>
                <th scope="col">所属角色</th>
                <th scope="col">操作</th>
              </tr>
              </thead>
              <tbody slot="tbody">
              <tr v-for="(item,index) in userList" :key="item.userId">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ item.userId }}</td>
                <td>
                  <router-link :to="'/user/info/' + item.userId">{{ item.username }}</router-link>
                </td>
                <td>{{ item.nickName }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.regTime | timeFilter }}</td>
                <td>{{ item.role }}</td>
                <td>
                  <div class="btn-group">
                    <button type="button" class="btn btn-danger">信息操作</button>
                    <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split"
                            data-toggle="dropdown" aria-expanded="false">
                      <span class="sr-only">Toggle Dropdown</span>
                    </button>
                    <div class="dropdown-menu">
                      <router-link class="dropdown-item" :to="'/user/update/'+item.userId"><span class="fa fa-edit fa-lg"></span>编辑</router-link>
<!--                      <a class="dropdown-item" href="#"><span class="fa fa-arrow-up fa-lg"></span>升级</a>-->
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" @click="deleteUser(item.userId)"><span
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
    </div>
  </main>
</template>

<script>

import {deleteContest, deleteUser, getAdminUserSet, getUserSet} from "@/api/requeset";
import MyTable from "../../../../components/Table/MyTable.vue";
import Swal from "sweetalert2";

export default {
  name: "AdminUser",
  data() {
    return {
      username: null,
      userList: [],
      pageInfo: {}
    };
  },
  methods: {
    deleteUser(delUserId) {
      Swal.fire({
        title: '你确定删除该用户吗?',
        text: "执行操作后，你将删除该用户及其判题信息!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '是的，删除它!',
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.value) {
          deleteUser(delUserId).then(res => {
                if (res.success) {
                  Swal.fire(
                      '删除成功!',
                      '该用户已经被成功删除',
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
    toPage(index) {
      // console.log("topage");
      getAdminUserSet(index, {
        username: this.username
      }).then(res => {
        // console.log(res);
        // console.log(result.extend.pageInfo.list)
        this.userList = res.extend.pageInfo.list;
        this.pageInfo = res.extend.pageInfo;
        // console.log(vue.pageInfo)
      }).catch(err => {
        console.log(err);
      });
    }
  },
  components: {
    MyTabel: MyTable
  },
  created() {
    this.toPage(1);
  },
  updated() {
    // $('[data-toggle="tooltip"]').tooltip();
  }
};
</script>
<style scoped>

</style>