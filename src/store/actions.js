/*
通过mutation间接更新state的多个方法的对象
 */

import {
  RECEIVE_PROBLEM,
  RECEIVE_USER
} from './mutations-types'
import request from '../api/ajax.js'

export default {
  // 异步获取地址
  async getUser({commit}) {
    await request({
        url: "/user/info",
        method: "GET"
      })
      .then(res => {
        // console.log(res);
        const user = res.data;
        commit(RECEIVE_USER, {
          user
        })
      })
      .catch(err => {
        console.log(err);
      });
  },
  // 异步获取地址
  async getProblem({commit}, pid) {
    await request({
        url: "/problem/" + pid,
        method: "GET"
      })
      .then(res => {
        // console.log(res);
        const user = res.data.extend.user;
        commit(RECEIVE_USER, {
          user
        })
      })
      .catch(err => {
        console.log(err);
      });
  },
}