<template>
    <div class="row caseItem">
        <div class="col-12">
            <span class="caseNum">用例{{index+1}} </span>
            <button class="btn btn-danger btn-sm" @click="delCase(index)">删除用例</button>
        </div>
        <div class="col-12 row judge-data">
            <div class="col-6">
                判题输入：
                <textarea v-model="caseIn" class="form-control judge-input" autofocus data-autofocus></textarea>
            </div>
            <div class="col-6">
                判题输出：
                <textarea
                        v-model="caseOut"
                        placeholder
                        class="form-control judge-output"
                        autofocus
                        data-autofocus
                ></textarea>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        model: {
            prop: "judgeCase"
        },
        props: {
            judgeCase: Object,
            index: Number,
        },
        data() {
            return {
                caseIn: "",
                caseOut: ""
            };
        },
        methods: {
            delCase() {
                this.$emit('toDelCase', this.index)
            }
        },
        watch: {
            caseIn(value) {
                if (value) {
                    this.judgeCase.in = value.trim() + "\n";
                }
            },
            caseOut(value) {
                if (value) {
                    this.judgeCase.out = value.trim() + "\n";
                }
            }
        },
        mounted() {
            // console.log(this.judgeCase);
            this.caseIn = this.judgeCase.in;
            this.caseOut = this.judgeCase.out;
        }
    };
</script>
<style>
    .caseNum {
        font-family: "微软雅黑", "黑体", "宋体";
        margin: 16px 0px 8px 0px;
        font-size: 15px;
    }
</style>