<template>
    <div class="container my-3">
        <h2 class="pt-4 text-center">
            YOJ Online Judge 帮助
        </h2>
        <div class="col-9 m-auto">
            <p class="font-weight-bold mt-5">Presentation Error</p>
            <div class="ml-5">
                题库中绝大多数的测试用例都包含文本末尾回车,只有极少数末尾没有回车。
            </div>
        </div>
        <div class="col-9 m-auto">
            <p class="font-weight-bold mt-5">编译环境</p>
            <table class="table table-hover table-bordered text-center mb-0">
                <thead class="thead-light" slot="thead">
                <tr>
                    <th scope="col">语言</th>
                    <th scope="col">编译环境/解释器</th>
                    <th scope="col">编译选项</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in compilers" :key="index">
                    <td>{{item.name}}</td>
                    <td class="text-primary">{{item.version}}</td>
                    <td class="text-primary">{{item.option}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="col-9 m-auto">
            <p class="font-weight-bold mt-5">JAVA主类名称</p>
            <div class="ml-5">
                如果你使用Java语言，对于所有的试题，你的主类名称都必须是Main。
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Help",
        data() {
            return {
                compilers: [{
                    name: "C",
                    version: 'gcc 7.4.0',
                    // option: 'gcc code.cpp -O2 -Wl,--stack=268435456 -DONLINE_JUDGE'
                },{
                    name: "C++",
                    version: 'g++ 7.4.0',
                    // option: 'g++ code.c -O2 -Wl,--stack=268435456 -DONLINE_JUDGE'
                },{
                    name: "JAVA",
                    version: 'openjdk version "11.0.4"',
                    option: "javac Main.java"
                }, {
                    name: "PYTHON",
                    version: "Python 3.6.9"
                }]
            }
        }
    }
</script>

<style scoped>

</style>