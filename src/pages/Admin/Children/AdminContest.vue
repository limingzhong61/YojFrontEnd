<template>
  <div>
    <div class="py-3 text-center">
      <h2>比赛管理</h2>
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
<!--          <div class="input-group mb-3">-->
<!--            <div class="input-group-prepend">-->
<!--              <label class="input-group-text" for="userName">更新所有问题文件</label>-->
<!--            </div>-->
<!--            <button type="button" class="btn btn-primary" @click="updateAllProblemFile">确定</button>-->
<!--          </div>-->
        </form>
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
export default {
  name: "AdminContest"
}
</script>

<style scoped>

</style>