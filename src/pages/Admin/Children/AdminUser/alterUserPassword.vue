<template>

  <main>
    <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">修改用户密码</h1>
    </div>
    <div>
      <div class="container update">
        <div class="row">
          <div class="col-md-8 order-md-1 offset-md-2">
            <form class="">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="username">旧密码:</label>
                </div>
                <input
                    type="text"
                    :class="{'form-control': true,'is-invalid': !userIdJudge,'is-valid': userIdJudge}"
                    id="username"
                    v-model="userId"
                    placeholder="输入原来的旧密码"
                    required="required"
                />
                <div class="invalid-feedback">
                  {{ oldPasswordMsg }}
                </div>
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="username">旧密码:</label>
                </div>
                <input
                    type="text"
                    :class="{'form-control': true,'is-invalid': !oldPasswordJudge,'is-valid': oldPasswordJudge}"
                    v-model="oldPassword"
                    placeholder="输入原来的旧密码"
                    required="required"
                />
                <div class="invalid-feedback">
                  {{ oldPasswordMsg }}
                </div>
              </div>
              <JudgePassword v-model="passwordJudge"></JudgePassword>

              <hr class="mb-3 mt-0"/>
              <div style="display: flex; justify-content: center;">
                <button @click="updatePassword" class="btn btn-primary btn-lg" type="bottom">&emsp;更新&emsp;</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import JudgePassword from "@/components/user/JudgePassword/JudgePassword";
import {judgeUserPassword, updateMyPassword} from "@/api/requeset";

export default {
  name: "alterUserPassword",
  components: {
    JudgePassword,
  },
  data() {
    return {
      oldPassword: "",
      oldPasswordJudge: Boolean,
      oldPasswordMsg: "",

      passwordJudge: {
        password: "",
        pass: false
      },
      // appApi: process.env.VUE_APP_BASE_API,
    };
  },
  methods: {
    judgePassword() {
      judgeUserPassword({
        userId: this.$route.params.id,
        password: this.oldPassword
      }).then(res => {
        console.log(res)
        this.oldPasswordJudge = res.success
      }).catch(err => {
        console.log(err);
      });
    },
    updatePassword() {
      if (!this.oldPasswordJudge || !this.passwordJudge.pass) {
        return;
      }
      // console.log("in");
      updateMyPassword({
        oldPassword: this.oldPassword,
        newPassword: this.passwordJudge.password
      }).then(res => {
        console.log(res)
        if (res.success) {
          Swal.fire(
              '更新成功!',
              '您的信息已经更新成功.',
              'success'
          )
        } else {
          Swal.fire(
              '更新失败!',
              '请刷新后重试.',
              'error'
          )
        }

      }).catch(err => {
        console.log(err);
      });
    },

  },
  watch: {
    oldPassword: function () {
      this.judgePassword()
      if (this.oldPasswordJudge) {
        this.oldPasswordMsg = "";
      } else {
        this.oldPasswordMsg = "旧密码错误";
      }
    },
  },
  created() {
  }, updated() {
  }
}
</script>

<style scoped>

</style>