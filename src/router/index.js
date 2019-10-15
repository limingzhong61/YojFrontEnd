/*
路由器模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../pages/Login/Login.vue'
import Home from '../pages/Home/Home.vue'
import ProblemSet from '../pages/Problem/ProblemSet.vue'
import SolutionSet from '../pages/Solution/SolutionSet.vue'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'hash',
    routes: [{
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/problem',
            component: ProblemSet
        },
        {
            path: '/solution',
            component: SolutionSet
        }
    ]
})