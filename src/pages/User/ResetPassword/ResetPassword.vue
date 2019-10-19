<template>
  <div class="container reset-password">
    <div class="row">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="password">密码:</label>
        </div>
        <input
          type="password"
          :class="{'col-9': true,'form-control': true,'is-invalid': false,'is-valid': false}"
          id="password"
          v-model="password"
          placeholder
          required="required"
        />
        <ul class="list-group list-group-horizontal col-3 md-1 ml-3">
          <li
            :class="{'col-1':true,'list-group-item': true,'bg-secondary': strength >= 1}"
          >{{strength==1 ? '弱':''}}xxx</li>
          <li
            :class="{'col-1':true,'list-group-item': true,'bg-info': strength >= 2}"
          >{{strength==2 ? '中':''}}</li>
          <li
            :class="{'col-1':true,'list-group-item': true,'bg-warning': strength >= 3}"
          >{{strength==3 ? '强':''}}</li>
          <li
            :class="{'col-1':true,'list-group-item': true,'bg-danger': strength >= 4}"
          >{{strength==4 ? '超强':''}}</li>
        </ul>
        <div class="invalid-feedback">{{}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      strength: 0,
      password: "",
      length: 0
    };
  },
  watch: {
    password(val) {
      this.length = val.length;
      //   console.log(this.length);
      this.strength = 0;
      var strength = this.strength;
      if (val.length > 6) {
        if (/\d/.test(val)) strength++; //数字
        if (/[a-z]/.test(val)) strength++; //小写
        if (/[A-Z]/.test(val)) strength++; //大写
        if (/\W/.test(val)) strength++; //特殊字符
      }
      this.strength = strength;
      console.log(this.strength);
      //   if (val.length > 12) return 4;
    }
  }
};
</script>
<style>
/* .reset-password {
  margin-top: 100px;
} */
.list-group-horizontal {
  text-align: center;
}
.list-group-item {
  width: 90px;
  height: 36px;
  background-color: #28a745;
  text-align: center;
  padding-top: 5px;
}
</style>