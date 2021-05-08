<template>
  <div class="container">
    <div class="row">
      <div class="col-2">
        <div class="nav flex-column nav-pills mt-3">
          <router-link class="btn btn-outline-success" to="/admin/problem">题目管理</router-link>
          <router-link class="btn btn-outline-success" to="/admin/contest">比赛管理</router-link>
          <router-link class="btn btn-outline-success" to="/admin/user">用户管理</router-link>
        </div>
      </div>
      <div class="col-10">
        <div class="tab-content" id="v-pills-tabContent">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Admin",

}
</script>

<style scoped>
</style>