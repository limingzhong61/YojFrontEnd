<template>
    <div class="passwordJudge">
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text" for="password">密码:</label>
            </div>
            <input
                    type="password"
                    :class="{'col-7': true,'form-control': true,'is-invalid': passwordStrength < 2,'is-valid': passwordStrength >= 2}"
                    id="password"
                    v-model="password"
                    placeholder
                    required="required"
            />
            <div class="col-4 mb-1">
                <ul class="list-group list-group-horizontal" style="height: 100%;width:100%">
                    <li
                            :class="{col:true,'list-group-item': true,'bg-secondary': passwordStrength == 1}"
                    >{{passwordStrength==1 ? '弱':''}}
                    </li>
                    <li
                            :class="{col:true,'list-group-item': true,'bg-info': passwordStrength == 2}"
                    >{{passwordStrength==2 ? '中':''}}
                    </li>
                    <li
                            :class="{col:true,'list-group-item': true,'bg-warning': passwordStrength == 3}"
                    >{{passwordStrength==3 ? '强':''}}
                    </li>
                    <li
                            :class="{col:true,'list-group-item': true,'bg-danger': passwordStrength == 4}"
                    >{{passwordStrength==4 ? '牛':''}}
                    </li>
                </ul>
            </div>
            <div class="invalid-feedback">{{passwordMsg}}</div>
        </div>

        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text" for="secondPassword">确认密码:</label>
            </div>
            <input
                    type="password"
                    :class="{'form-control': true,'is-invalid': !secondPasswordJudge,'is-valid': secondPasswordJudge}"
                    id="secondPassword"
                    v-model="secondPassword"
                    placeholder
            />
            <div class="invalid-feedback">{{secondPasswordMsg}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        model: {
            prop: "passwordJudge",
            event: 'change'
        },
        props: {
            passwordJudge: Object
        },
        data() {
            return {
                password: "",
                passwordStrength: 0,
                passwordMsg: "",

                secondPassword: "",
                secondPasswordJudge: false,
                secondPasswordMsg: ""
            };
        },
        watch: {
            password: function (value) {
                this.secondPasswordJudge = value == this.secondPassword;
                if (this.secondPasswordJudge) {
                    this.secondPasswordMsg = "两次密码不一致";
                } else {
                    this.secondPasswordMsg = "";
                }

                //   console.log(this.length);
                this.passwordStrength = 0;
                var passwordStrength = this.passwordStrength;
                if (value.length > 6) {
                    if (/\d/.test(value)) passwordStrength++; //数字
                    if (/[a-z]/.test(value)) passwordStrength++; //小写
                    if (/[A-Z]/.test(value)) passwordStrength++; //大写
                    if (/\W/.test(value)) passwordStrength++; //特殊字符
                }

                this.passwordStrength = passwordStrength;
                if (this.passwordStrength > 2) {
                    this.passwordMsg = "";
                } else {
                    this.passwordMsg =
                        "密码强度不够。数字、字母大小写、特殊字符能增加密码强度";
                }
                this.$emit('change', {password: this.password, pass: passwordStrength < 2})
            },
            secondPassword: function (value) {
                this.secondPasswordJudge = value == this.password;
                if (this.secondPasswordJudge) {
                    this.secondPasswordMsg = "两次密码不一致";
                    this.$emit('change', {password: this.password, pass: false})
                    return;
                }
                this.secondPasswordMsg = "";
                this.$emit('change', {password: this.password, pass: true})
            }
        }
    };
</script>
<style>
    /* 密码框样式 */
    .passwordJudge .list-group-horizontal {
        text-align: center;
    }

    .passwordJudge .list-group-item {
        background-color: #28a745;
        text-align: center;
        padding-bottom: 0;
        padding-top: 8px;
    }
</style>