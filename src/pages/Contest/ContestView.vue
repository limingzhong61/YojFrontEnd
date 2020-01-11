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
    import {ROLE_NAME} from "../../api/static";

    export default {
        data() {
            return {
                contest: {},
                alter: false,
            };
        }, computed: mapState({
            user(state) {
                // console.log(state.user)
                return state.user;
            }
        }),
        methods: {
            canAlter(){
                // return true
                return this.user != null && this.user.role == ROLE_NAME.ADMIN
            }
        },created() {
            getContestView(this.$route.params.id).then(res =>{
                console.log(res)
                this.contest = res.extend.contest
            }).catch(error =>{
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
