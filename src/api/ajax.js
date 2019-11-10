/*
ajax请求函数模块
降低ajax对特定库(jquery,axios,vue-resource)的依赖
便于更换
 */
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export default function request(config) {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    // timeout: 5000,
  })
  return instance(config)
}