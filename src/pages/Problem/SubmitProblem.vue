<template>
  <div class="container" style="margin-top: 80px;">
    <div class="row">
      <div class="col-md-10 order-md-1 offset-1 pl-3" style="background-color: rgb(228, 241, 255);">
        <div class="section visible mx-3">
          <div class="section__header">
            <h2 class="section__title my-4">递交以评测</h2>
            <!-- <div sec:authorize="!isAuthenticated()">
              <p id="user" style="color: red; text-align: center;">提交代码前，请先登录</p>
            </div> -->
          </div>
          <div class="section__body">
            <form method="post">
              <div class="input-group mb-4 col-6" style="padding-left: 0;">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="inputGroupSelect01">代码语言</label>
                </div>
                <select
                  :class="{'is-invalid': language == -1,'is-valid': language != -1,'custom-select':true}"
                  id="inputGroupSelect01"
                  v-model="language"
                >
                  <option selected value="-1">请选择语言</option>
                  <option value="0">C</option>
                  <option value="1">C++</option>
                  <option value="2">Java</option>
                  <option value="3">Python</option>
                </select>
                <div class="invalid-feedback">提交代码前，请选择语言。</div>
              </div>

              <div class="mb-4">
                <div name="code" class="textarea-container monospace">
                  <textarea
                    v-model="code"
                    placeholder
                    :class="{'is-invalid': code.trim() == '','is-valid': code.trim() == '',
                    'textbox':true,'form-control':true}"
                    autofocus
                    data-autofocus
                  ></textarea>
                  <div class="invalid-feedback">代码不能为空。</div>
                </div>
              </div>
              <div class="mb-4">
                <div class="columns">
                  <input @click="submitSolution" type="button" class="btn btn-danger" value="提交评测" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../../api/ajax.js";
export default {
  data() {
    return {
      language: -1,
      code: ""
    };
  },
  // watch: {
  // },
  methods: {
    submitSolution() {
      var solution = {
        language: this.language,
        code: this.code.trim(),
        problemId: this.$route.params.id
      };
      console.log(solution);
      if(solution.code == '' || solution.language == -1){
        return
      }
      console.log('in')
      request({
        url: "/solution/submit",
        method: "post",
        data: solution
      })
        .then(res => {
          console.log(res);
          if (res.data.success) {
            this.$router.replace("/solution");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style>
.section__title {
  font-size: 1.125em;
}

.textbox.form-control {
  height: 295px;
}
.invalid-feedback {
  font-size: 15.2px;
}
</style>