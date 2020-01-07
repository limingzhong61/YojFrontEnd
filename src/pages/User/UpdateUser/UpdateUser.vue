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
                            {{usernameMsg}}
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
                            {{nickNameMsg}}
                        </div>
                    </div>

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
    import {getCurrentUserInfo, getUserInfo, updateUserInfo} from "../../../api/requeset";
    import * as Swal from "sweetalert2";

    export default {
        data() {
            return {
                username: "",
                usernameJudge: true,
                usernameMsg: "",


                nickName: "",
                nickNameJudge: true,
                nickNameMsg: "",


                intro: "",
            };
        },
        methods: {
            updateUserInfo() {
                console.log("in")
                if (
                    !this.usernameJudge ||
                    !this.nickNameJudge
                ) {
                    return;
                }
                // console.log(this.imageCode);
                updateUserInfo({
                    username: this.username,
                    nickName: this.nickName,
                    intro: this.intro,
                    //  headers: this.headers
                })
                    .then(res => {
                        console.log(res);
                        if (res.success) {
                            Swal.fire(
                                '更新成功!',
                                '您的信息已经更新成功.',
                                'success'
                            )
                        } else {
                            // console.log(this.$data)
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
            },
        },
        watch: {
            username: function (value) {
                console.log(value)
                if (value === "") {
                    this.usernameJudge = false;
                    this.usernameMsg = "用户名不能为空";
                    return;
                }
                console.log(value.length);
                if (value.length > 20) {
                    this.usernameJudge = false;
                    this.usernameMsg = "用户名太长";
                    return;
                }
                this.usernameJudge = true;
            },
            nickName: function (value) {
                console.log(value)
                if (value === "") {
                    this.nickNameJudge = false;
                    this.nickNameMsg = "昵称不能为空";
                    return;
                }
                console.log(value.length);
                if (value.length > 20) {
                    this.nickNameJudge = false;
                    this.nickNameMsg = "昵称太长";
                    return;
                }
                this.nickNameJudge = true;
            },
        },
        created() {
            // console.log("in");
            getCurrentUserInfo()
                .then(res => {
                    // console.log(res);
                    // console.log(result.extend.pageInfo.list)
                    this.user = res.extend.user;
                    const user = res.extend.user;
                    console.log(user);
                    for (var field in user) {
                        // console.log(field)
                        this.$data[field] = user[field];
                    }

                    // this.countAccepted = res.extend.accepted;
                    // this.countSubmission = res.extend.submission;
                })
                .catch(err => {
                    console.log(err);
                });
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

    .invalid-feedback {
        text-align: center;
    }
</style>