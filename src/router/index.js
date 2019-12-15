/*
路由器模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../pages/Home/Home.vue')

const ProblemSet = () => import('../pages/Problem/ProblemSet.vue')
const ProblemView = () => import('../pages/Problem/ProblemView.vue')
const SubmitProblem = () => import('../pages/Problem/SubmitProblem.vue')
const AlterProblem = () => import('../pages/Problem/AlterProblem.vue')
const AddProblem = () => import('../pages/Problem/AddProblem.vue')

const Login = () => import('../pages/User/Login/Login.vue')
const Register = () => import('../pages/User/Register/Register.vue')

const SolutionSet = () => import('../pages/Solution/SolutionSet.vue')
const SolutionDetail = () => import('../pages/Solution/SolutionDetail/SolutionDetail.vue')

const UserSet = () => import('../pages/User/UserSet/UserSet.vue')
const ResetPassword = () => import('../pages/User/ResetPassword/ResetPassword.vue')
const UserInfo = () => import('../pages/User/UserInfo/UserInfo.vue')
const UpdateUser = () => import('../pages/User/UpdateUser/UpdateUser.vue')


Vue.use(VueRouter)

export default new VueRouter({
    mode: 'hash',
    routes: [{
        path: '/',
        redirect: '/home'
    },
        {
            path: '/home',
            component: Home,
        }, {
            path: '/login',
            component: Login,
            meta: {
                hideTopBar: true,
                withOutLogin: true,
            }
        }, {
            path: '/register',
            component: Register,
            meta: {
                hideTopBar: true,
                withOutLogin: true,
            }
        }, {
            path: '/user',
            component: UserSet
        },
        {
            path: '/user/resetPassWord',
            component: ResetPassword,
            meta: {
                hideTopBar: true,
                withOutLogin: true,
            }
        }, {
            path: '/user/info/:id',
            component: UserInfo,
        }, {
            path: '/user/update',
            component: UpdateUser,
        },
        {
            path: '/problem',
            component: ProblemSet,
        }, {
            path: '/problem/view/:id',
            component: ProblemView
        }, {
            path: '/problem/submit/:id',
            component: SubmitProblem
        }, {
            path: '/problem/alter/:id',
            component: AlterProblem
        }, {
            path: '/problem/add',
            component: AddProblem
        },
        {
            path: '/solution',
            component: SolutionSet
        },
        {
            path: '/solution/detail/:id',
            component: SolutionDetail
        }
    ]
})