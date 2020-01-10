<template>
    <div class="wrapper">
        <div class="container login">
            <div class="row">
                <div class="col-md-12 order-md-1">
                    <form class="form-signin">
                        <div class="imgDiv">
                            <img class="mb-8" src="../../../assets/images/astronaut.jpg" alt width="72" height="72"/>
                        </div>
                        <h1 class="h3 mb-3 font-weight-normal d-flex justify-content-center">请登录</h1>
                        <!--判断-->
                        <p class="mb-3 loginFail" v-show="loginFail">{{loginMsg}}</p>
                        <label class="sr-only">用户名</label>
                        <input
                                type="text"
                                name="userName"
                                class="form-control"
                                placeholder="用户名"
                                required
                                autofocus
                                v-model="username"
                        />
                        <label class="sr-only">密码</label>
                        <input
                                type="password"
                                name="password"
                                class="form-control"
                                placeholder="密码"
                                required
                                v-model="password"
                        />
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <!-- <span class="input-group-text" id="basic-addon1">@</span> -->
                                <VerifyImg class="m-1"></VerifyImg>
                            </div>
                            <input
                                    v-model="verifyCode"
                                    type="text"
                                    class="form-control m-1"
                                    placeholder="验证码"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                            />
                        </div>

                        <div class="checkbox mb-3 d-flex justify-content-center">
                            <label>
                                <input type="checkbox" v-model="rememberMe"/>记住我,14天免登陆
                            </label>
                        </div>
                        <button
                                class="btn btn-lg btn-primary btn-block mb-3"
                                type="submit"
                                @click.prevent="login"
                        >登录
                        </button>
                        <router-link href="#" to="/register" class="d-flex justify-content-center">没有账号，快去注册
                        </router-link>
                        <router-link
                                href="#"
                                to="/user/resetPassword"
                                class="d-flex justify-content-center"
                        >忘记密码，快去找回
                        </router-link>
                        <!--<a class="btn btn-sm" th:href="@{/index.html(l='zh_CN')}">中文</a>-->
                        <!--<a class="btn btn-sm" th:href="@{/index.html(l='en_US')}">English</a>-->
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {toLogin} from "../../../api/requeset";
    import VerifyImg from "../../../components/VerifyImg/VerifyImg";

    export default {
        data() {
            return {
                username: "",
                password: "",
                loginFail: false,
                loginMsg: "",
                verifyCode: "",
                rememberMe: false
            };
        },
        components: {
            VerifyImg
        }, watch: {
            username(){
                this.loginMsg = ""
            },
            password(){
                this.loginMsg = ""
            },
            verifyCode(){
                this.loginMsg = ""
            }
        },
        methods: {
            login() {
                const username = this.username;
                const password = this.password;
                toLogin(
                    {
                        tryCode: this.verifyCode,
                        username,
                        password,
                        rememberMe: this.rememberMe,
                    })
                    .then(res => {
                        console.log(res);
                        if (res.success) {
                            this.$router.replace("/");
                            this.$store.dispatch("getUser");
                        } else {
                            this.loginFail = true;
                            this.loginMsg = res.msg;
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
    .login {
        margin-top: -0.5rem;
    }

    .loginFail {
        text-align: center;
        color: red;
    }

    .wrapper {
        /* margin-top: -10px; */
        display: -ms-flexbox;
        display: -webkit-box;
        display: flex;
        -ms-flex-align: center;
        -ms-flex-pack: center;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        /* background-color: #f5f5f5; */
    }

    .form-signin {
        width: 100%;
        max-width: 330px;
        padding: 15px;
        margin: 0 auto;
    }

    .form-signin .checkbox {
        font-weight: 400;
    }

    .form-signin .form-control {
        position: relative;
        box-sizing: border-box;
        height: auto;
        padding: 10px;
        font-size: 16px;
    }

    .form-signin .form-control:focus {
        z-index: 2;
    }

    .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .form-signin input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }

    .imgDiv {
        display: flex;
        justify-content: center;
    }
</style>