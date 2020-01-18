<template>
    <div class="container" style="margin-top: 80px;">
        <div class="row">
            <div class="mt-3">
                <a href="#" @click.prevent="back()">
                    <i class="fa fa-reply"></i> 返回
                </a>
            </div>
        </div>
        <div class="row">
            <div class="col-md-10 order-md-1 offset-1 pl-3" style="background-color: rgb(228, 241, 255);">
                <div class="section visible mx-3">
                    <form class="my-4">
                        <div name="code" class="textarea-container monospace">
                            <label>
                                <strong class="font-weight-bold col-6 mr-0 pr-1" style="font-size: 150%">
                                    <i class="fa fa-code"></i>源代码
                                </strong>
                            </label>
                            <button
                                    type="button"
                                    class="btn btn-sm btn-outline-primary mb-1  ml-0"
                                    @click="copy()"
                            >复制
                            </button>
                            <textarea
                                    ref="codeText"
                                    v-model="solution.code"
                                    placeholder
                                    class="textbox form-control"
                                    autofocus
                                    data-autofocus
                                    readonly="readonly"
                            ></textarea>
                        </div>
                        <div name="code" class="textarea-container mt-3">
                            <label>
                                <strong class="font-weight-bold col-6 mr-0 pr-1">
                                    <i class="fa fa-info-circle"></i>错误信息
                                </strong>
                            </label>
                            <div class="alert alert-info"
                            >{{solution.errorMessage}}</div>
                            <div class="invalid-feedback">代码不能为空。</div>
                        </div>
                    </form>
                    <table class="table table-hover table-bordered text-center table-sm">
                        <caption>详情记录</caption>
                        <thead class="thead-light">
                        <tr class>
                            <th class>评测点序号</th>
                            <th class>评测结果</th>
                            <th class>
                                <span class="fa fa-clock-o fa-lg text-secondary"></span>
                                运行时间
                            </th>
                            <th class>
                                <span class="fa fa-database fa-lg text-secondary"></span>
                                内存使用
                            </th>
                            <th class>
                                <span class="fa fa-file-code-o fa-lg text-secondary"></span>
                                下载评测数据
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in testList" :key="index">
                            <th scope="row">{{index}}</th>
                            <!-- <td scope="row">{{item}}</td> -->
                            <td scope="row">{{judgeResult[item.result]}}</td>
                            <td scope="row">{{item.timeUsed != null ? item.timeUsed + 'ms' : " " }}</td>
                            <td scope="row">{{item.memoryUsed ? item.memoryUsed / 10 + "KB" : " "}}</td>
                            <td scope="row">
                                <a href="#">敬请期待</a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {solutionDetail} from "../../../api/requeset";
    import {JUDGE_RESULT} from "../../../api/static";

    export default {
        data() {
            return {
                judgeResult: JUDGE_RESULT,
                solution: {},
                testList: []
            };
        },
        methods: {
            back() {
                this.$router.back();
            },
            copy() {
                this.$refs.codeText.select();
                document.execCommand("copy");
                // console.log("复制成功");
            }
        },
        created() {
            solutionDetail(this.$route.params.id)
                .then(res => {
                    console.log(res);
                    const solution = res.extend.solution;
                    this.solution = res.extend.solution;
                    this.testList = JSON.parse(solution.testResult);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };
</script>
<style>
    .title {
        font-size: 1.9rem;
    }

    .textbox.form-control {
        /* height: 295px; */
        min-height: 15rem;
        max-height: 230px;
        background-color: white;
    }

    .invalid-feedback {
        font-size: 15.2px;
    }
</style>