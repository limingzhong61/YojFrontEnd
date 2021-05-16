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
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
          <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
        </div>
        <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               class="feather feather-calendar">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          This week
        </button>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-md-8 order-md-1 offset-md-2">
          <form class="needs-validation" novalidate>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="userName">删除问题</label>
              </div>
              <input
                  type="text"
                  :class="{'form-control': true,'is-invalid': false,'is-valid': false}"
                  id="userName"
                  v-model="pid"
                  required="required"
                  placeholder="删除问题ID"
              />
              <button type="button" class="btn btn-primary" @click="deleteProblem">确定</button>
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="alterProblem">修改问题</label>
              </div>
              <input
                  type="text"
                  :class="{'form-control': true,'is-invalid': false,'is-valid': false}"
                  id="alterProblem"
                  v-model="alterProblemId"
                  required="required"
                  placeholder="修改问题ID"
              />
              <button type="button" class="btn btn-primary" @click="alterProblem">确定</button>
            </div>
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
import {deleteProblem, updateAllProblemFile} from "../../../api/requeset";
import Swal from 'sweetalert2'

export default {
  name: "Problem",
  data() {
    return {
      pid: null,
      alterProblemId: null,
    }
  }, methods: {
    deleteProblem() {
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
          deleteProblem(this.pid).then(res => {
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
    alterProblem() {
      this.$router.push('/problem/alter/'+this.alterProblemId)
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
    }
  }
}
</script>

<style scoped>

</style>