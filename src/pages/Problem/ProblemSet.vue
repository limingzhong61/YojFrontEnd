<template>
    <div class="container my-set pt-3 px-5">
        <div class="row">
            <div class="col-md-12 order-md-1">
                <button type="button" class="btn btn-primary" @click="toAdd">添加题目</button>
                <div class="col-10 offset-1">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">PID</span>
                        </div>
                        <input
                                v-model="problemId"
                                type="text"
                                class="form-control"
                                placeholder="PID"
                                aria-label="Recipient's username"
                                aria-describedby="button-addon2"
                        />
                        <div class="input-group-prepend ml-3">
                            <span class="input-group-text">问题名称</span>
                        </div>
                        <input
                                v-model="title"
                                type="text"
                                class="form-control"
                                placeholder="问题名称"
                                aria-label="Recipient's username"
                                aria-describedby="button-addon2"
                        />
                        <div class="input-group-append ml-2">
                            <button @click="toPage(1)" class="btn btn-primary" type="button" id="button-addon2">
                                <!-- <span class="fa fa-search fa-lg text-secondary"></span> -->
                                Go
                            </button>
                        </div>
                    </div>
                </div>
                <MyTabel :pageInfo="pageInfo" @toPage="toPage">
                    <thead class="thead-light" slot="thead">
                    <tr>
                        <th scope="col">PID</th>
                        <th scope="col">状态</th>
                        <th scope="col">名称</th>
                        <th scope="col">
                            <span class="fa fa-tags fa-lg text-secondary"></span>
                            标签
                        </th>
                        <th scope="col">递交</th>
                        <th scope="col">AC%</th>
                    </tr>
                    </thead>
                    <tbody slot="tbody">
                    <tr v-for="item in problemList" :key="item.problemId">
                        <th scope="row">{{item.problemId}}</th>
                        <td>
                <span
                        v-if="item.userSolved"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="已通过"
                        class="fa fa-check fa-lg text-success"
                ></span>
                            <span
                                    v-else-if="item.userSubmitted"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="未通过"
                                    class="fa fa-close fa-lg text-danger"
                            ></span>
                            <span
                                    v-else
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="未提交"
                                    class="fa fa-circle-o fa-lg text-warning"
                            ></span>
                        </td>
                        <td>
                            <router-link :to="'/problem/view/' + item.problemId">{{item.title}}</router-link>
                        </td>
                        <td>
                            {{item.tag}}
                        </td>
                        <!-- <td>入门</td> -->
                        <td>{{item.submissions}}</td>
                        <td>{{item.submissions ? Math.round(item.accepted / item.submissions * 100) + '%' : '未知'}}</td>
                    </tr>
                    </tbody>
                </MyTabel>
            </div>
        </div>
    </div>
</template>

<script>
    import {getProblemSet} from "../../api/requeset";
    import $ from "jquery";
    import MyTabel from "../../components/Table/MyTable.vue";
    import * as Swal from "sweetalert2";
    import {mapState} from "vuex";
    import {ROLE_NAME} from "../../api/static";

    export default {
        data() {
            return {
                problemId: null,
                title: null,
                problemList: [],
                pageInfo: {},
                add: false
            };
        }, computed: mapState({
            user(state) {
                return state.user;
            }
        }),
        methods: {
            toPage(index) {
                this.$route.query.pageNumber = index
                // console.log("topage"+index);
                this.elderProblemId = this.problemId;
                this.elderTitle = this.title;
                getProblemSet(index, {
                    problemId: this.problemId,
                    title: this.title
                })
                    .then(res => {
                        // console.log(res);
                        const data = res;
                        this.problemList = res.extend.pageInfo.list;
                        this.pageInfo = res.extend.pageInfo;
                        this.add = data.add;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            toAdd() {
                if (this.user != null && this.user.role === ROLE_NAME.ADMIN) {
                    this.$router.push('/problem/add')
                } else {
                    Swal.fire({
                        title: "你没有添加题目的权限",
                        icon: "warning"
                    });
                }
            }
        },
        components: {
            MyTabel
        },
        created() {
            this.toPage(1);
        },
        updated() {
            $('[data-toggle="tooltip"]').tooltip();
            // console.log('update')
        }
    };
</script>

<style>
</style>