<template>
    <div class="container" style="margin-top: 80px;">
        <div class="row">
            <div class="col-md-12 order-md-1">
                <div class="problem" style="display:block;">
                    <div class="input-group mb-3 col-md-6 offset-md-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">比赛名称</span>
                        </div>
                        <input
                                name="title"
                                type="text"
                                v-model="title"
                                :class="{'form-control': true,'is-invalid': title == '','is-valid': title != ''}"
                                placeholder="比赛名称"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                        />
                        <div class="invalid-feedback">比赛名称不能为空.</div>
                    </div>
                    <!--     time module-->
                    <div class="input-group mb-3 col-md-11 mx-auto">
                        <div class="input-group col">
                            <div class="input-group-prepend">
                                <span class="input-group-text">开始时间</span>
                            </div>
                            <input
                                    name="startTime"
                                    v-model="startTime"
                                    type="datetime-local"
                                    :class="{'form-control': true,'is-invalid': startTime == '','is-valid': startTime != ''}"
                                    placeholder="开始时间"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                            />
                        </div>
                        <div class="input-group col-md-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">总计时长:</span>
                            </div>
                            <input
                                    name="endTime"
                                    v-model="duration"
                                    readonly="value"
                                    :class="{'form-control': true,'is-invalid': duration <= 0,'is-valid': duration > 0 }"
                                    placeholder="结束时间"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                            />
                        </div>
                        <div class="input-group col">
                            <div class="input-group-prepend">
                                <span class="input-group-text">结束时间</span>
                            </div>
                            <input
                                    name="endTime"
                                    v-model="endTime"
                                    type="datetime-local"
                                    :class="{'form-control': true,'is-invalid': endTime == '','is-valid': endTime != ''}"
                                    placeholder="结束时间"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                            />
                        </div>
                    </div>
                    <!-- 问题描述组件 -->
                    <div class="des">
                        <TextEditor
                                v-model="description"
                                :isClear="false"
                                :title="'比赛描述'"
                        ></TextEditor>
                        <div class="sec_header">
                            比赛题目
                            <button class="btn btn-primary btn-sm" @click="addContestProblem">添加题目</button>
                        </div>
                        <div class="col-12 mb-3">
                            <!--                            <div class="mb-3">注意：判题用例最多不能超过10个</div>-->
                            <div>
                                <div class="row caseItem">
                                    <table class="table table-hover table-bordered text-center mb-0">
                                        <!--                                        <TableCaption pageInfo="pageInfo" toPage="toPage"></TableCaption>-->
                                        <thead class="thead-light" slot="thead">
                                        <tr>
                                            <th scope="col">题目序号</th>
                                            <th scope="col">添加题目id</th>
                                            <th scope="col">题目分数</th>
                                            <th scope="col">操作</th>
                                        </tr>
                                        </thead>
                                        <tbody slot="tbody">
                                        <tr v-for="(item,index) in contestProblemList" :key="index">
                                            <th scope="row">{{index+1}}</th>
                                            <td><input v-model="item.problemId"/></td>
                                            <td><input v-model="item.score"/></td>
                                            <td>
                                                <button @click="delProblem(index)" class="btn btn-danger btn-sm">删除
                                                </button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="display: flex; justify-content: center;">
                    <button
                            @click="addContest"
                            class="btn btn-primary btn-lg justify-content-sm-center"
                            type="submit"
                    >添加比赛
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TextEditor from "../../../../components/TextEditor/TextEditor.vue";
    import {addContest} from "../../../../api/requeset";
    import * as Swal from "sweetalert2";

    export default {
        data() {
            return {
                title: "",
                startTime: '',
                endTime: "",
                description: "",
                contestProblemList: []
            };
        },
        components: {
            TextEditor,
        },
        computed: {
            duration: function () { // unit minute
                let startDate = Date.parse(this.startTime)
                let endDate = Date.parse(this.endTime)
                // console.log(startDate)
                // console.log(endDate)
                let duration = (endDate - startDate) / 1000 / 60
                // console.log(duration)
                if (isNaN(duration)) {
                    duration = "未知"
                }
                return duration
            }
        }, methods: {
            addContestProblem() {
                this.contestProblemList.push({})
                console.log(this.contestProblemList)
            },
            delProblem(index) {
                this.contestProblemList.splice(index, index + 1);
            },
            addContest() {
                const title = this.title
                if (title === "" || !/\d+/.test(this.duration) || this.duration <= 0 ) {
                    return
                }
                const startTime = new Date(this.startTime)
                const endTime = new Date(this.endTime)
                console.log(this.startTime)
                addContest({
                    title,
                    endTime,
                    startTime,
                    description: this.description,
                    contestProblemList: this.contestProblemList
                }).then(res => {
                    console.log(res)
                    if (res.success) {
                        console.log("success")
                        console.log("/contest/view/" + res.extend.contestId)
                        this.$router.push("/contest/view/" + res.extend.contestId)

                    }else{
                        console.log("fail")
                        Swal.fire({
                            title: '添加失败',
                            text: res.msg,
                            icon: 'error',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: '了解'
                        })
                    }
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    };
</script>
<style>
    .problem .des {
        margin: 20px 80px 12px 80px;
        padding: 16px 40px 16px 40px;
        background: #e4f1ff;
    }

    * {
        margin: 0;
        padding: 0;
        font-family: "宋体", "Times New Roman";
    }

    .problem .des .sec_header,
    .problem .des .pdsec {
        font-family: "微软雅黑", "黑体", "宋体";
        margin: 16px 0px 8px 0px;
        font-size: 16px;
    }

    .invalid-feedback {
        font-size: 1rem;
    }
</style>