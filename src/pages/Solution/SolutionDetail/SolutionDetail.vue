<template>
  <div class="container" style="margin-top: 80px;">
    <div class="row">
      <div class="mt-3">
        <a href="#" @click.prevent="back()">
          <i class="fa fa-reply"></i> 返回
        </a>
      </div>
    </div>
    <div class="row">
      <div class="col-md-10 order-md-1 offset-1 pl-3" style="background-color: rgb(228, 241, 255);">
        <div class="section visible mx-3">
          <form class="my-4">
            <div name="code" class="textarea-container monospace">
              <label for="validationTextarea">
                <strong class="font-weight-bold col-6 title mr-0 pr-1">
                  <i class="fa fa-code"></i>源代码
                </strong>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-primary mb-3 ml-0"
                  @click="copy()"
                >复制</button>
              </label>
              <textarea
                ref="codeText"
                v-model="solution.code"
                placeholder
                :class="{
                    'textbox':true,'form-control':true}"
                autofocus
                data-autofocus
                readonly="readonly"
              ></textarea>
              <div class="invalid-feedback">代码不能为空。</div>
            </div>
          </form>
          <table class="table table-hover table-bordered text-center">
            <caption>详情记录</caption>
            <thead class="thead-light">
              <tr class>
                <th class>评测点序号</th>
                <th class>评测结果</th>
                <th class th:text="运行时间">
                  <span class="fa fa-clock-o fa-lg text-secondary"></span>
                  CPU使用
                </th>
                <th class>
                  <span class="fa fa-database fa-lg text-secondary"></span>
                  内存使用
                </th>
                <th class>
                  <span class="fa fa-file-code-o fa-lg text-secondary"></span>
                  下载评测数据
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in testList" :key="index">
                <th scope="row">{{index}}</th>
                <!-- <td scope="row">{{item}}</td> -->
                <td scope="row"></td>
                <td scope="row">{{item.timeUsed != null ? item.timeUsed + 'ms' : " " }}</td>
                <td scope="row">{{item.memoryUsed ? item.memoryUsed / 10 + "KB" : " "}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../../../api/ajax.js";
export default {
  data() {
    return {
      solution: {},
      testList: [],
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    copy() {
      this.$refs.codeText.select();
      document.execCommand("copy");
      // console.log("复制成功");
    }
  },
  created() {
    request({
      url: "/solution/detail/" + this.$route.params.id,
      method: "get"
    })
      .then(res => {
        console.log(res);
        const solution = res.data.extend.solution;
        this.solution = res.data.extend.solution;
         console.log(solution.testResult)
        this.testList = JSON.parse(solution.testResult);
        console.log(this.testList)
        // console.log(result.extend.pageInfo.list)
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style >
.title {
  font-size: 1.9rem;
}

.textbox.form-control {
  /* height: 295px; */
  min-height: 20px;
  max-height: 230px;
}
.invalid-feedback {
  font-size: 15.2px;
}
</style>