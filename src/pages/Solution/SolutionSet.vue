<template>
  <div class="container my-set pt-3 px-0">
    <div class="row">
      <div class="col-md-12 order-md-1">
        <div class="panel panel-default">
          <solution-table></solution-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SolutionTable from "../../components/Solution/SolutionTable/SolutionTable.vue";
export default {
  components: {
    SolutionTable
  }
};
</script>
<style>
</style>