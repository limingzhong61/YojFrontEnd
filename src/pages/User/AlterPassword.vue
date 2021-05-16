<template>
  <div class="container update">
    <div class="py-3 text-center">
      <h2>修改密码</h2>
    </div>
    <hr/>
    <div class="row">
      <div class="col-md-8 order-md-1 offset-md-2">
        <form class="">
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
</template>

<script>
// import {mapState} from "vuex";
import {judgeUserPassword, updateMyPassword} from "@/api/requeset";
import JudgePassword from "../../components/user/JudgePassword/JudgePassword.vue";
import Swal from "sweetalert2";

export default {
  name: "AlterPassword",
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
  // computed: mapState({
  //   user(state) {
  //     return state.user;
  //   }
  // }),
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