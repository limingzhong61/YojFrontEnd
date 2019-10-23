<template>
  <div class="container" style="margin-top: 80px;">
    <div class="row">
      <div class="col-md-12 order-md-1">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h2 class="panel-title">评测状态</h2>
          </div>
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