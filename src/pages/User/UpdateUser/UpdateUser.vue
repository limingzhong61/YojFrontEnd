<template>
  <div class="container update">
    <div class="py-3 text-center">
      <h2>修改信息</h2>
    </div>

    <div class="row">
      <div class="col-md-8 order-md-1 offset-md-2">
        <form class="">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="username">用户名:</label>
            </div>
            <input
                type="text"
                :class="{'form-control': true,'is-invalid': !usernameJudge,'is-valid': usernameJudge}"
                id="username"
                v-model="username"
                placeholder
                required="required"
            />
            <div class="invalid-tooltip">
              {{ usernameMsg }}
            </div>
            <!--            <button class="ml-3 btn btn-primary" type="bottom">&emsp;更新&emsp;</button>-->
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="nickName">昵称:</label>
            </div>
            <input
                type="text"
                :class="{'form-control': true,'is-invalid': !nickNameJudge,'is-valid': nickNameJudge}"
                id="nickName"
                v-model="nickName"
                placeholder
                required="required"
            />
            <div class="invalid-tooltip">
              {{ nickNameMsg }}
            </div>
          </div>
          <!---------------------------   update 头像      ------------------------------ -->
          <div class="mb-3">
            <div class="col-3 order-md-1">
              <img class="user-img ml-auto" :src="appApi+'/image/avatar/'+ user.userId +'.jpg'"/>
            </div>
            <div>
              <input type="file" ref="file" accept="image/*" @change="updateUserAvatar()">
            </div>
          </div>
          <!----------------------------   update 头像    ---------------   -->
          <div class="mb-3">
            <label for="validationTextarea">个人简介</label>
            <textarea v-model="intro" class="form-control" id="validationTextarea"
                      placeholder="Required example textarea" required></textarea>
          </div>
          <hr class="mb-3 mt-0"/>
          <div style="display: flex; justify-content: center;">
            <button @click="updateUserInfo" class="btn btn-primary btn-lg" type="bottom">&emsp;更新&emsp;</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {getCurrentUserInfo, updateUserInfo, updateUserAvatar, deleteProblem} from "../../../api/requeset";
import * as Swal from "sweetalert2";
import {mapState} from "vuex";

export default {
  data() {
    return {
      userId: this.$route.params.id,
      username: "",
      usernameJudge: true,
      usernameMsg: "",

      nickName: "",
      nickNameJudge: true,
      nickNameMsg: "",
      intro: "",
      appApi: process.env.VUE_APP_BASE_API,
    };
  }, computed: mapState({
    user(state) {
      return state.user;
    }
  }),
  methods: {
    updateUserInfo() {
      if (
          !this.usernameJudge ||
          !this.nickNameJudge
      ) {
        return;
      }
      // console.log(this.imageCode);
      updateUserInfo({
        userId: this.userId,
        username: this.username,
        nickName: this.nickName,
        intro: this.intro,
        //  headers: this.headers
      })
          .then(res => {
            if (res.success) {
              Swal.fire(
                  '更新成功!',
                  '您的信息已经更新成功.',
                  'success'
              ).then((result) => {
                if (result.value) {
                  window.location.reload()
                }
              })

            } else {
              const extend = res.data.extend;
              for (var obj in extend) {
                this.$data[obj + "Judge"] = false;
                this.$data[obj + "Msg"] = extend[obj];
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
    },// 文件、图片上传
    updateUserAvatar() {
      console.log(this.$refs)
      // 获取到this 赋值个that
      var file = this.$refs.file.files[0];
      if (!file) {
        console.log("upload file data is empty")
        return
      } // 如果没有文件就返回
      // 拿到上传的文件
      console.log(file)
      var data = new FormData();
      // 创建一个表单数据
      data.append("uploadFile", file);
      console.log(data)
      // 把图片或文件添加到data
      updateUserAvatar(data)
          .then(res => {
                console.log(res);
                if (res.success) {
                  // if (res.data.error && res.data.error == 0) {
                  //   // 如果错误为0
                  //   this.pics.push(res.data.pic);
                  //   // 把图片加入到图片pics数组
                  // }
                  this.$refs.file.value = "";
                  // 清空表单数据
                  this.pre = 0;
                  // 清空上传进度数据}
                  Swal.fire(
                      '更新成功!',
                      '您的头像已经更新成功.',
                      'success'
                  ).then((result) => {
                    if (result.value) {
                      window.location.reload()
                    }
                  })
                } else {
                  if(res.extend.bigFile){
                    Swal.fire(
                        '上传图片过大!',
                        '上传图片不能超过1MB.',
                        'warning'
                    )
                  }
                }
              }
          ).catch(err => {
        console.log(err);

      });
    },

  },
  watch: {
    username: function (value) {
      if (value === "") {
        this.usernameJudge = false;
        this.usernameMsg = "用户名不能为空";
        return;
      }
      if (value.length > 20) {
        this.usernameJudge = false;
        this.usernameMsg = "用户名太长";
        return;
      }
      this.usernameJudge = true;
    },
    nickName: function (value) {
      if (value === "") {
        this.nickNameJudge = false;
        this.nickNameMsg = "昵称不能为空";
        return;
      }
      if (value.length > 20) {
        this.nickNameJudge = false;
        this.nickNameMsg = "昵称太长";
        return;
      }
      this.nickNameJudge = true;
    },
  },
  created() {
    getCurrentUserInfo()
        .then(res => {
          console.log(res);
          this.user = res.extend.user;
          const user = res.extend.user;
          for (var field in user) {
            this.$data[field] = user[field];
          }
          // this.countAccepted = res.extend.accepted;
          // this.countSubmission = res.extend.submission;
        })
        .catch(err => {
          console.log(err);
        });
  }, updated() {
    this.user = this.user
  }
};
</script>

<style>
.input-group-text {
  background-color: #e9ecef40;
  width: 9rem;
  text-align: center;
  display: inline-block;
}

.user-img {
  width: 10rem;
}

.invalid-feedback {
  text-align: center;
}
</style>