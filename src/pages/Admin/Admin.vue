<template>
  <div class="container-fluid">
    <div class="row">
      <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div class="sidebar-sticky pt-3">
          <ul class="nav flex-column nav-pills">
            <li class="nav-item">
              <router-link class="nav-link btn-outline-success" to="/admin/problem">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     class="feather feather-file">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                  <polyline points="13 2 13 9 20 9"></polyline>
                </svg>
                题目管理
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link btn-outline-success" to="/admin/user">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     class="feather feather-users">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                用户管理
              </router-link>
            </li>
<!--            <ul class=" nav-item">-->
<!--              <li class="nav-item">-->
<!--                <router-link class="nav-link pl-0" to="/admin/alterUserPassword">-->
<!--                  修改用户密码-->
<!--                </router-link>-->
<!--                </li>-->
<!--              <li class="nav-item">A third item</li>-->
<!--            </ul>-->
            <li class="nav-item">
              <router-link class="nav-link btn-outline-success" to="/admin/contest">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     class="feather feather-home">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                比赛管理
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link btn-outline-success" to="/admin/solution">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     class="feather feather-bar-chart-2">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
                评测结果管理
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
      <router-view role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4"></router-view>
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