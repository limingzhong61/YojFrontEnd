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
      <h1 class="h2">评测结果管理</h1>
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
                <label class="input-group-text" for="userName">删除评测结果</label>
              </div>
              <input
                  type="text"
                  :class="{'form-control': true,'is-invalid': false,'is-valid': false}"
                  id="userName"
                  v-model="solutionId"
                  required="required"
                  placeholder="删除评测结果ID"
              />
              <button type="button" class="btn btn-primary" @click="deleteSolution">确定</button>
            </div>
          </form>
        </div>
      </div>

    </div>

  </main>
</template>

<script>
import Swal from "sweetalert2";
import {delSolutionById} from "@/api/requeset";

export default {
  name: "AdminSolution",
  data() {
    return {
      solutionId: null,
    }
  }, methods: {
    deleteSolution() {
      Swal.fire({
        title: '你确定删除该评测结果吗?',
        text: "执行操作后，你将不能恢复到之前的状态!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '是的，删除它!',
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.value) {
          delSolutionById(this.solutionId).then(res => {
                if (res.success) {
                  Swal.fire(
                      'Deleted!',
                      'Your solution has been deleted.',
                      'success'
                  )
                } else {
                  Swal.fire(
                      'Fail!',
                      "Your solution hasn't been deleted.",
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
  }
}
</script>

<style scoped>

</style>