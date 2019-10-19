<template>
  <div class="container" style="margin-top: 80px;">
    <div class="row">
      <div class="col-md-12 order-md-1">
        <div class="problem" style="display:block;">
          <div class="tit" v-text="problem.title"></div>
          <div id="prbinfos">
            <div
              class="res"
            >时间限制：{{problem.timeLimit*1.0/1000}}s &nbsp; 内存限制：{{problem.memoryLimit/1.0}}MB</div>
          </div>
          <div style="text-align:center">
            <router-link
              class="btn btn-primary"
              role="button"
              :to="'/problem/submit/' + this.$route.params.id"
            >提交此题</router-link>&nbsp;
            <router-link
              class="btn btn-warning"
              role="button"
              :to="'/problem/alter/' + this.$route.params.id"
            >修改此题</router-link>
          </div>
          <div class="des">
            <div class="sec_header">问题描述</div>
            <div class="sec_note" v-html="problem.description"></div>
            <div class="sec_header">输入格式</div>
            <div class="sec_cont">
              <div class="sec_note" v-html="problem.formatInput"></div>
            </div>
            <div class="sec_header">输出格式</div>
            <div class="sec_cont">
              <div class="sec_note" v-html="problem.formatOutput"></div>
            </div>
            <div class="sec_header">样例输入</div>
            <div class="sec_text">
              <div class="sec_note" v-html="problem.sampleInput"></div>
            </div>
            <div class="sec_header">样例输出</div>
            <div class="sec_text">
              <div class="sec_note" v-html="problem.sampleOutput"></div>
            </div>
            <div class="sec_header">提示</div>
            <div class="sec_cont">
              <div class="sec_note" v-html="problem.hint"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import request from "../../api/ajax.js";
export default {
  computed: {
    problem(){
      return this.$store.state.problem
    }
  },
  mounted() {
    // console.log(this.$route.params.id)
    this.$store.dispatch("getProblem", this.$route.params.id);
  }
};
</script>
<style>
.problem .tit {
  font-size: 18px;
  font-family: "微软雅黑", "黑体", "宋体";
  text-align: center;
  margin: 10px 0px 20px 0px;
  font-weight: bold;
}

.problem .des {
  margin: 20px 80px 12px 80px;
  padding: 16px 40px 16px 40px;
  background: #e4f1ff;
}

* {
  margin: 0;
  padding: 0;
  font-family: "宋体", "Times New Roman";
}

.problem .res {
  text-align: center;
  font-size: 12px;
  color: #0e479d;
  margin: 0px 0px 14px 0px;
}

.problem .des .sec_note,
.problem .helpbox .helpnote {
  border: #0066ff 1px dashed;
  margin: 8px 60px 12px 32px;
  padding: 8px 12px 8px 12px;
  font-family: "宋体";
}

.problem .des .sec_header,
.problem .des .pdsec {
  font-family: "微软雅黑", "黑体", "宋体";
  margin: 16px 0px 8px 0px;
  font-size: 16px;
}

.problem .btns {
  text-align: center;
  margin: 30px 0px 25px 0px;
}
</style>
