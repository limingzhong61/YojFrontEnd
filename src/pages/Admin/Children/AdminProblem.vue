<template>
  <div>
    <div class="py-3 text-center">
      <h2>问题管理</h2>
    </div>
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
                placeholder
                required="required"
            />
            <button type="button" class="btn btn-primary" @click="deleteProblem">确定</button>
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="userName">更新所有问题文件</label>
            </div>
            <button type="button" class="btn btn-primary" @click="updateAllProblemFile">确定</button>
          </div>
        </form>
      </div>
    </div>
    <div class="py-3 text-center">
      <h3>
        <router-link href="#" to="/problem/add" class="d-flex justify-content-center">添加问题</router-link>
      </h3>
    </div>
  </div>
</template>

<script>
import {deleteProblem, updateAllProblemFile} from "../../../api/requeset";
import Swal from 'sweetalert2'

export default {
  name: "Problem",
  data() {
    return {
      pid: null,
    }
  }, methods: {
    deleteProblem() {
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