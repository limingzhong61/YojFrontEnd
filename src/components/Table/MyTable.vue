<template>
  <table class="table table-hover table-bordered text-center mb-0">
    <TableCaption :pageInfo="pageInfo" @toPage="toPage"></TableCaption>
    <slot name="thead"></slot>
    <slot name="tbody"></slot>
  </table>
</template>

<script>
import TableCaption from "./TableCaption/TableCaption.vue";
export default {
  props: {
    pageInfo: Object,
  },
  components: {
    TableCaption
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