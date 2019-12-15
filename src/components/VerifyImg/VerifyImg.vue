<template>
  <img ref="verifiedImg" alt="验证码" @click="getVerifyImage" :src="verifiedImg" />
</template>

<script>
import {getImageCode} from "../../api/requeset";
export default {
  data() {
    return {
      verifiedImg: ""
    };
  },
  methods: {
    getVerifyImage() {
      getImageCode()
        .then(response => {
          //将从后台获取的图片流进行转换
          return (
            "data:image/png;base64," +
            btoa(
              new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            )
          );
        })
        .then(res => {
          // console.log(res);
          this.verifiedImg = res;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getVerifyImage();
  }
};
</script>
<style>
</style>