<template>
  <!-- information of devide page -->
  <caption class="pb-0">
    当前
    <strong class="font-weight-bold text-dark">{{pageInfo.pageNum}}</strong>
    页，总
    <strong class="font-weight-bold text-dark">{{pageInfo.pages}}</strong>
    页，共
    <strong class="font-weight-bold text-dark">{{pageInfo.total}}</strong>
    条记录<div class="row">
          <div class="col-6"></div>
          <!-- 分页条信息 -->
          <nav aria-label="Page navigation example" id="page_nav_area">
            <ul class="pagination">
              <li :class="{'page-item': true,disabled: !pageInfo.hasPreviousPage}">
                <a class="page-link" href="#" @click.prevent="toPage(1)">首页</a>
              </li>
              <li :class="{'page-item': true,disabled: !pageInfo.hasPreviousPage}">
                <a
                  class="page-link"
                  href="#"
                  @click.prevent="pageInfo.hasPreviousPage && toPage(pageInfo.pageNum - 1)"
                >«</a>
              </li>

              <li
                :class="{'page-item': true,active: index == pageInfo.pageNum}"
                v-for="index in pageInfo.navigatepageNums"
                :key="index"
              >
                <a class="page-link" href="#" @click.prevent="toPage(index)">{{index}}</a>
              </li>

              <li :class="{'page-item':true,disabled: !pageInfo.hasNextPage} ">
                <a
                  class="page-link"
                  href="#"
                  @click.prevent="pageInfo.hasNextPage && toPage(pageInfo.pageNum + 1)"
                >»</a>
              </li>
              <li :class="{'page-item': true, disabled: !pageInfo.hasNextPage}">
                <a class="page-link" href="#" @click.prevent="toPage(pageInfo.pages)">末页</a>
              </li>
            </ul>
          </nav>
        </div>
  </caption>
</template>

<script>
export default {
  props: {
    pageInfo: Object,
  },methods:{
    toPage(index){
      // console.log('son ')
      this.$emit('toPage',index)
    }
  }
};
</script>
<style>
</style>