<template>
    <div class="container my-set pt-3 px-5">
        <div class="row">
            <div class="col-md-12 order-md-1">
                <div class="col-6 m-auto">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">用户名</span>
                        </div>
                        <input
                                model="username"
                                type="text"
                                class="form-control"
                                placeholder="用户名"
                                aria-label="Recipient's username"
                                aria-describedby="button-addon2"
                        />
                        <div class="input-group-append ml-2">
                            <button
                                    @click="toPage(1)"
                                    class="btn btn-outline-secondary"
                                    type="button"
                            >Go</button>
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
                        <th scope="col">时长</th>
                        <th scope="col">题数</th>
                        <th scope="col">创建者</th>
                    </tr>
                    </thead>
                    <tbody slot="tbody">
                    <tr v-for="(item,index) in userList" :key="item.userId">
                        <th scope="row">{{index+1}}</th>
                        <td>
                            <router-link :to="'/user/info/' + item.userId">{{item.username}}</router-link>
                        </td>
                        <td>{{item.nickName}}</td>
                        <td>{{item.solved}}</td>
                        <td>{{item.attempted}}</td>
                        <td>{{item.accepted}}</td>
                        <td>{{item.submissions}}</td>
                    </tr>
                    </tbody>
                </MyTabel>
            </div>
        </div>
    </div>

</template>

<script>
    import MyTabel from "../../components/Table/MyTable.vue";
    export default {
        name: "ContestSet",
        components: {
            MyTabel
        },
    }
</script>

<style scoped>

</style>