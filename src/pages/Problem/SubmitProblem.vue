<template>
  <div class="container" style="margin-top: 80px;">
    <div class="row">
      <div class="col-md-10 order-md-1 offset-1 pl-3" style="background-color: rgb(228, 241, 255);">
        <div class="section visible mx-4">
          <div>
            <h2 class="section__title my-4 font-weight-bold">递交以评测</h2>
          </div>
          <form method="post">
            <div class="input-group row ml-0 mb-4">
              <div class="input-group-prepend">
                <label class="input-group-text" for="language">代码语言</label>
              </div>
              <select
                :class="{'is-invalid': language == -1,
                    'is-valid': language != -1,'custom-select':true}"
                id="language"
                v-model="language"
              >
                <option selected value="-1">请选择语言</option>
                <option value="0">C</option>
                <option value="1">C++</option>
                <option value="2">Java</option>
                <option value="3">Python</option>
              </select>
              <div class="input-group col-6">
                <div class="input-group-prepend ml-auto">
                  <div class="input-group-text">
                    <input
                      v-model="share"
                      type="checkbox"
                      aria-label="Checkbox for following text input"
                    />
                    分享代码
                  </div>
                </div>
              </div>
              <div class="invalid-feedback col-6">提交代码前，请选择语言。</div>
            </div>
            <div name="code" class="mb-4 textarea-container monospace">
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
            <div class="columns mb-4">
              <input @click="submitSolution" type="button" class="btn btn-danger" value="提交评测" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { submitSolution } from "../../api/requeset";
export default {
  data() {
    return {
      language: -1,
      code: "",
      share: 0
    };
  },
  methods: {
    submitSolution() {
      // console.log(this.share);
      const solution = {
        language: this.language,
        code: this.code.trim(),
        problemId: this.$route.params.id,
        share: Number(this.share)
      };
      // console.log(solution);
      if (solution.code == "" || solution.language == -1) {
        return;
      }
      // console.log("in");
      submitSolution(solution)
        .then(res => {
          // console.log(res);
          if (res.success) {
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