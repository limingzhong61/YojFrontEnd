<template>
    <div class="container my-set pt-3 px-5">
        <div class="row">
            <div class="col-md-12 order-md-1">
<!--                <button type="button" class="btn btn-primary mb-1" @click="toAdd">添加比赛</button>-->
                <div class="col-12 mx-auto">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">比赛名称</span>
                        </div>
                        <input
                                model="username"
                                type="text"
                                class="form-control"
                                placeholder="比赛名称"
                                aria-label="Recipient's username"
                                aria-describedby="button-addon2"
                        />
                        <div class="input-group-append ml-2">
                            <button
                                    @click="toPage(1)"
                                    class="btn btn-outline-secondary"
                                    type="button"
                            >Go
                            </button>
                        </div>
                    </div>
                </div>
                <MyTabel :pageInfo="pageInfo" @toPage="toPage">
                    <thead class="thead-light" slot="thead">
                    <tr>
                        <th scope="col">CID</th>
                        <th scope="col">名称</th>
                        <th scope="col">状态</th>
                        <th scope="col">开始时间</th>
                        <th scope="col">结束时间</th>
                        <th scope="col">题数</th>
                        <th scope="col">创建者</th>
                    </tr>
                    </thead>
                    <tbody slot="tbody">
                    <tr v-for="(item) in contestProblemList" :key="item.contestId">
                        <th scope="row">{{item.contestId}}</th>
                        <td><router-link :to="'/contest/view/' + item.contestId">{{item.title}}</router-link></td>
                        <td>{{status(item.startTime,item.endTime)}}</td>
                        <td>{{item.startTime | timeFilter}}</td>
                        <td>{{item.endTime | timeFilter}}</td>
                        <td>{{item.totalProblem}}</td>
                        <td><router-link :to="'/user/info/' + item.userId">{{item.username}}1</router-link></td>
                    </tr>
                    </tbody>
                </MyTabel>
            </div>
        </div>
    </div>

</template>

<script>
    import MyTabel from "../../components/Table/MyTable.vue";
    import {ROLE_NAME} from "../../api/static";
    import * as Swal from "sweetalert2";
    import {mapState} from "vuex";
    import {getContestList} from "../../api/requeset";

    export default {
        name: "ContestSet",
        data() {
            return {
                pageInfo: {},
                contestProblemList: [],
            }
        },
        components: {
            MyTabel
        }, computed: mapState({
            user(state) {
                return state.user;
            }
        }),
        methods: {
            toAdd() {
                if (this.user != null && this.user.role === ROLE_NAME.ADMIN) {
                    this.$router.push('/contest/add')
                } else {
                    Swal.fire({
                        title: "你没有添加题目的权限",
                        icon: "warning"
                    });
                }
            },
            toPage(pageNumber){
                getContestList(pageNumber,{contestId: 1}).then(res => {
                    this.pageInfo = res.extend.pageInfo;
                    this.contestProblemList = this.pageInfo.list;
                }).catch(error => {
                    console.log(error)
                })
            },status(startTime,endTime){
               let start = Date.parse(startTime)
               let end = Date.parse(endTime)
               let now = Date.parse(new Date())
                // console.log(now)
                if(now > end){
                    return "已结束"
                }else if (now > start){
                    return "进行中"
                }else{
                    return "未开始"
                }
            }
        },
        created() {
            this.toPage(1)
        }
    }
</script>

<style scoped>

</style>