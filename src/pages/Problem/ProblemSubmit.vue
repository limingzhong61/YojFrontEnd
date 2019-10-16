<template>
  <div class="container" style="margin-top: 80px;">
    <div class="row">
      <div class="col-md-10 order-md-1 offset-1 pl-3" style="background-color: rgb(228, 241, 255);">
        <div class="section visible mx-3">
          <div class="section__header">
            <h2 class="section__title my-4">递交以评测</h2>
            <div sec:authorize="!isAuthenticated()">
              <p id="user" style="color: red; text-align: center;">提交代码前，请先登录</p>
            </div>
            <!--判断-->
            <!--<p style="color: red" th:text="${msg}" th:if="${not #strings.isEmpty(msg)}"></p>-->
          </div>
          <input hidden="hidden" value="${pid}" name="problemId" />
          <div class="section__body">
            <form th:action="@{/s/submit}" method="post">
              <div class="input-group mb-4 col-6" style="padding-left: 0;">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="inputGroupSelect01">代码语言</label>
                </div>
                <select class="custom-select" id="inputGroupSelect01" name="language">
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
                    name="code"
                    placeholder
                    class="textbox form-control"
                    autofocus
                    data-autofocus
                  ></textarea>
                  <div class="invalid-feedback">代码不能为空。</div>
                </div>
              </div>

              <div class="mb-4">
                <div class="columns">
                  <input type="hidden" name="problemId" th:value="${pid}" />
                  <input type="submit" class="btn btn-danger" value="提交评测" />
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
// $(function () {
//     $("form").submit(function () {
//         if(document.getElementById("user")){
//             return false;
//         }
//         if(!validate($("select"),$("select").val() != "-1")){
//             return false;
//         }
//         if(!validate($("textarea"),$("textarea").val() != "")){
//             return false;
//         }
//         // return false;
//     });
//     $("select").change(function () {
//         validate(this,this.value != "-1");
//     });
//     $("textarea").change(function () {
//         validate(this,this.value != "");
//     });

// });
export default {};
</script>
<style>
.section__title {
  font-size: 1.125em;
}

textarea.textbox {
  height: 295px;
}
.invalid-feedback {
  font-size: 15.2px;
}
</style>