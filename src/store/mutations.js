 /*
直接更新state的多个方法的对象
 */
 // import Vue from 'vue'
 import {
     RECEIVE_PROBLEM,
     RECEIVE_USER
 } from './mutations-types'
 export default {
     [RECEIVE_USER] (state,{user}){
        state.user = user
     },
     [RECEIVE_PROBLEM](state, {
         problem
     }) {
         state.problem = problem
     }
 }