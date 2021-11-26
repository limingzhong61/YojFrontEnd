/*
通过mutation间接更新state的多个方法的对象
 */

import {
    RECEIVE_PROBLEM,
    RECEIVE_USER
} from './mutations-types'
import {getCurrentUserInfo, getProblemView} from '../api/requeset'

export default {
    // 异步获取用户信息
    getUser({commit}) {
        getCurrentUserInfo()
            .then(res => {
                if (res.success) {
                    const user = res.extend.user;
                    console.log("getUser:" + user)
                    commit(RECEIVE_USER, {
                        user
                    })
                }
            })
            .catch(err => {
                console.log(err);
            });
    },
    // 异步获取问题
    async getProblem({commit}) {
        await getProblemView()
            .then(res => {
                // console.log(res);
                const problem = res.extend.problem;
                commit(RECEIVE_PROBLEM, {
                    problem
                })
            })
            .catch(err => {
                console.log(err);
            });
    },
}