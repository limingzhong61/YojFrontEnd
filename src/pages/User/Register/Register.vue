<template>
    <div class="container register">
        <div class="py-3 text-center">
            <img
                    class="d-block mx-auto mb-3"
                    src="../../../assets/images/astronaut.jpg"
                    alt
                    width="72"
                    height="72"
            />
            <h2>注册账号</h2>
            <router-link href="#" to="/login" class="d-flex justify-content-center">已有账号，快去登录</router-link>
        </div>
        <div class="row">
            <div class="col-md-8 order-md-1 offset-md-2">
                <form class="needs-validation" novalidate>
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
                        <div class="invalid-feedback">{{usernameMsg}}</div>
                    </div>

                    <JudgePassword v-model="passwordJudge"></JudgePassword>

                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="email">Email:</label>
                        </div>
                        <input
                                type="email"
                                :class="{'form-control': true,'is-invalid': !emailJudge,'is-valid': emailJudge}"
                                id="email"
                                v-model="email"
                                placeholder="you@example.com"
                        />
                        <div class="invalid-feedback">{{emailMsg}}</div>
                    </div>

                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="emailCode">邮箱验证码:</label>
                        </div>
                        <input
                                type="number"
                                :class="{'col-9': true,'form-control': true,'is-invalid': !emailCodeJudge,'is-valid': emailCodeJudge}"
                                id="emailCode"
                                v-model="emailCode"
                                placeholder
                        />
                        <div class="col-3 md-1">
                            <button
                                    ref="emailBtn"
                                    @click="sendEmail"
                                    class="btn btn-outline-info btn-md btn-block"
                                    type="button"
                            >获取验证码
                            </button>
                        </div>
                        <div class="invalid-feedback">邮箱验证码错误.</div>
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="emailCheckCode">验证码:</label>
                        </div>
                        <input
                                type="text"
                                :class="{'col-9': true,'form-control': true,
              'is-invalid': !imageCodeJudge,'is-valid': imageCodeJudge}"
                                v-model="imageCode"
                                placeholder
                        />
                        <div class="col-3 m-auto">
                            <VerifyImg></VerifyImg>
                        </div>
                        <div class="invalid-feedback">验证码错误.</div>
                    </div>
                    <div class="input-group mb-1" style="text-align: center;">
                        <p style="text-align: center;">邮箱验证码仅在10分钟内有效</p>
                    </div>
                    <hr class="mb-3 mt-0"/>
                    <div style="display: flex; justify-content: center;">
                        <button
                                @click.prevent="register"
                                class="btn btn-primary btn-lg"
                                type="bottom"
                        >&emsp;注册&emsp;
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <!--加载图片model-->
        <div class="container">
            <div
                    id="myModal"
                    class="modal"
                    data-keyboard="false"
                    data-backdrop="static"
                    data-role="dialog"
                    aria-labelledby="myModalLabel"
                    aria-hidden="true"
            >
                <div id="loading" class="loading">发送邮件中。。。</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {register, getRegisterEmailCode, getImageCode} from "../../../api/requeset";
    import JudgePassword from "../../../components/user/JudgePassword/JudgePassword.vue";
    import $ from "jquery";
    import VerifyImg from "../../../components/VerifyImg/VerifyImg.vue";

    export default {
        data() {
            return {
                username: "",
                usernameJudge: true,
                usernameMsg: "",

                passwordJudge: {
                    password: "",
                    pass: false
                },

                email: "",
                emailJudge: true,
                emailMsg: "",

                emailCode: "",
                emailCodeJudge: true,
                emailCodeMsg: "",
                headers: {},
                maxTime: 60,

                imageCode: "",
                imageCodeJudge: true,
                imageCodeMsg: ""
            };
        },
        components: {
            JudgePassword,
            VerifyImg
        },
        methods: {
            countDown(maxTime, emailBtn) {
                var countDownVar = window.setInterval(() => {
                    if (maxTime == 0) {
                        emailBtn.disabled = "";
                        emailBtn.innerHTML = "获取验证码";
                        clearInterval(countDownVar);
                    } else {
                        emailBtn.disabled = "disabled";
                        emailBtn.innerHTML = maxTime + "秒后重新获取";
                        maxTime--;
                    }
                }, 1000);
            },
            sendEmail() {
                if (this.email === "") {
                    this.emailJudge = false;
                    this.emailMsg = "邮箱地址不能为空";
                }
                if (!this.emailJudge) {
                    return;
                }
                $("#myModal").modal("show");
                getRegisterEmailCode(this.email)
                    .then(res => {
                        $("#myModal").modal("hide");

                        this.emailJudge = res.success;
                        if (res.success) {
                            this.$options.methods.countDown(this.maxTime, this.$refs.emailBtn);
                        } else {
                            this.emailMsg = res.msg;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        $("#myModal").modal("hide");
                    });
            },
            register() {
                if (
                    !this.usernameJudge ||
                    this.passwordJudge.strength < 2 ||
                    !this.emailJudge
                ) {
                    return;
                }
                register({
                    username: this.username,
                    password: this.passwordJudge.password,
                    email: this.email,
                    emailCode: this.emailCode,
                    imageCode: this.imageCode
                    //  headers: this.headers
                })
                    .then(res => {
                        if (res.success) {
                            this.$router.replace("/login");
                        } else {
                            const extend = res.extend;
                            for (var obj in extend) {
                                this.$data[obj + "Judge"] = false;
                                this.$data[obj + "Msg"] = extend[obj];
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
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
                        this.verifiedImg = res;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
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

            email: function (value) {
                var emailReg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/i;
                this.emailJudge = emailReg.test(value);
                if (!this.emailJudge) {
                    this.emailMsg = "请输入一个有效的电子邮件地址.";
                    return;
                }
            },
            emailCode(value) {
                this.emailCodeJudge = true;
            },
            imageCode(value) {
                this.imageCodeJudge = true;
            }
        },
        created() {
            this.getVerifyImage();
            // var csrfHeader = this.$("meta[name='_csrf_header']").attr("content");
            // var csrfToken = this.$("meta[name='_csrf']").attr("content");
            // var headers = {};
            // headers[csrfHeader] = csrfToken;
            // this.headers = headers;
        }
    };
</script>
<style>
    .register.container {
        margin-top: -40px;
    }

    .input-group-text {
        background-color: #e9ecef40;
        width: 9rem;
        text-align: center;
        display: inline-block;
    }

    .invalid-feedback {
        text-align: center;
    }

    .loading {
        width: 200px;
        height: 56px;
        position: absolute;
        top: 50%;
        left: 50%;
        line-height: 56px;
        color: #fff;
        padding-left: 60px;
        font-size: 15px;
        background: #000 url("../../../assets/images/loading.gif") no-repeat 10px 50%;
        opacity: 0.7;
        z-index: 9999;
        -moz-border-radius: 20px;
        -webkit-border-radius: 20px;
        border-radius: 20px;
        filter: progid:DXImageTransform.Microsoft.Alpha(opacity=70);
    }
</style>