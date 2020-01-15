<template>
    <div class="container" style="margin-top: 80px;">
        <div class="row">
            <div class="col-md-12 order-md-1">
                <div class="contest" style="display:block;">
                    <div class="tit" v-text="contest.title"></div>
                    <div id="prbinfos">
                        <div class="res"
                        >&nbsp; 开始时间：{{contest.startTime | timeFilter}} &nbsp; 结束时间：{{contest.endTime | timeFilter}}
                        </div>
                    </div>
                    <div style="text-align:center">
                        <router-link
                                class="btn btn-warning"
                                role="button"
                                v-if="canAlter()"
                                :to="'/contest/alter/' + this.$route.params.id"
                        >修改比赛信息
                        </router-link>
                    </div>
                    <div class="des">
                        <div>
                            <div class="sec_header">比赛介绍</div>
                            <div class="sec_note" v-html="contest.description"></div>
                            <!--    contest problem-->
                            <div>
                                <div class="sec_header">比赛题目</div>
                                <!--   only started contest can show-->
                                <div v-if="status >= 0" class="col-10 mb-3 mx-auto">
                                    <!--                            <div class="mb-3">注意：判题用例最多不能超过10个</div>-->
                                    <div>
                                        <div class="row caseItem">
                                            <table class="table table-hover table-bordered text-center mb-0">
                                                <!--                                        <TableCaption pageInfo="pageInfo" toPage="toPage"></TableCaption>-->
                                                <thead class="thead-light" slot="thead">
                                                <tr>
                                                    <th scope="col">题目序号</th>
                                                    <th scope="col">问题名称</th>
                                                    <th scope="col">题目分数</th>
                                                </tr>
                                                </thead>
                                                <tbody slot="tbody">
                                                <tr v-for="(item,index) in contestProblemList" :key="index">
                                                    <th scope="row">{{index+1}}</th>
                                                    <td><a href="#" @click.prevent="toProblemView(item.problemId)">{{item.title}}</a>
                                                    </td>
                                                    <td>{{item.score}}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="sec_note">比赛未开始，不能查看比赛题目</div>
                            </div>
                            <div>
                                <div class="sec_header">
                                    比赛排名
                                </div>
                                <!--   only started contest can show-->
                                <div v-if="status == 1" class="col-10 mb-3 mx-auto">
                                    <div>
                                        <div class="row caseItem">
                                            <table class="table table-hover table-bordered text-center mb-0">
                                                <!--                                        <TableCaption pageInfo="pageInfo" toPage="toPage"></TableCaption>-->
                                                <thead class="thead-light" slot="thead">
                                                <tr>
                                                    <th scope="col">序号</th>
                                                    <th scope="col">用户</th>
                                                    <th scope="col">总分</th>
                                                    <th scope="col">总用时</th>
                                                </tr>
                                                </thead>
                                                <tbody slot="tbody">
                                                <tr v-if="userList != null" v-for="(item,index) in userList" :key="index">
                                                    <th scope="row">{{index+1}}</th>
                                                    <td><router-link :to=" '/user/info/' + item.userId">{{item.nickName}}</router-link>
                                                    </td>
                                                    <td>{{item.score}}</td>
                                                    <td>{{item.totalRunTime}}ms</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="sec_note">比赛尚未结束</div>
                            </div>
                            <div>
                                <div class="sec_header">
                                    我的评测
                                </div>
                                <!--   only started contest can show-->
                                <div v-if="status >= 0" class="col-10 mb-3 mx-auto">
                                    <div>
                                        <div v-if="solutionList != null" class="row caseItem">
                                            <table class="table table-hover table-bordered text-center mb-0">
                                                <!--                                        <TableCaption pageInfo="pageInfo" toPage="toPage"></TableCaption>-->
                                                <thead class="thead-light" slot="thead">
                                                <tr>
                                                    <th scope="col">序号</th>
                                                    <th scope="col">SID</th>
                                                    <th scope="col">PID</th>
                                                    <th scope="col">提交人</th>
                                                    <th scope="col">评测结果</th>
                                                    <th scope="col">提交时间</th>
                                                </tr>
                                                </thead>
                                                <tbody slot="tbody">
                                                <tr v-for="(item,index) in solutionList" :key="index">
                                                    <th scope="row">{{index+1}}</th>
                                                    <th scope="row">{{item.solutionId}}</th>
                                                    <td><a href="#" @click.prevent="toProblemView(item.problemId)">{{item.problemId}}</a>
                                                    </td>
                                                    <td>{{user.nickName}}</td>
                                                    <td>{{JUDGE_RESULT[item.result]}}</td>
                                                    <td>{{item.submitTime | timeFilter}}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div v-else>{{solutionList}}</div>
                                    </div>
                                </div>
                                <div v-else class="sec_note">比赛尚未结束</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import * as Swal from "sweetalert2";
    import {getContestView} from "../../api/requeset";
    import {ROLE_NAME, JUDGE_RESULT} from "../../api/static";

    export default {
        data() {
            return {
                contest: {},
                contestProblemList: [],
                alter: false,
                status: -1,
                solutionList: null,
                userList: null,
                JUDGE_RESULT
            };
        }, computed: mapState({
            user(state) {
                // console.log(state.user)
                return state.user;
            }
        }),
        methods: {
            canAlter() {
                // return true
                return this.user != null && this.user.role == ROLE_NAME.ADMIN
            },
            toProblemView(problemId) {
                this.$router.push({
                    path: '/problem/view/' + problemId,
                    query: {
                        contestId: this.contest.contestId
                    }
                })

            }
        }, created() {
            getContestView(this.$route.params.id).then(res => {
                console.log(res)
                this.contest = res.extend.contest
                this.contestProblemList = res.extend.contestProblemList
                this.status = res.extend.contest.status
                this.solutionList = res.extend.solutionList
                this.userList = res.extend.userList
                // console.log(this.status)
            }).catch(error => {
                console.log(error)
            })
        }
    };
</script>
<style>
    .contest .tit {
        font-size: 18px;
        font-family: "微软雅黑", "黑体", "宋体";
        text-align: center;
        margin: 10px 0px 20px 0px;
        font-weight: bold;
    }

    .contest .des {
        margin: 20px 80px 12px 80px;
        padding: 16px 40px 16px 40px;
        background: #e4f1ff;
    }

    * {
        margin: 0;
        padding: 0;
        font-family: "宋体", "Times New Roman";
    }

    .contest .res {
        text-align: center;
        font-size: 0.8rem;
        color: #0e479d;
        margin: 0px 0px 14px 0px;
    }

    .contest .des .sec_note,
    .contest .helpbox .helpnote {
        border: #0066ff 1px dashed;
        margin: 8px 60px 12px 32px;
        padding: 8px 12px 8px 12px;
        font-family: "宋体";
    }

    .contest .des .sec_header,
    .contest .des .pdsec {
        font-family: "微软雅黑", "黑体", "宋体";
        margin: 16px 0px 8px 0px;
        font-size: 16px;
    }

    .contest .btns {
        text-align: center;
        margin: 30px 0px 25px 0px;
    }
</style>
