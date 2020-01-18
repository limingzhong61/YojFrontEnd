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
        // `withCredentials` 表示跨域请求时是否需要使用凭证
        // 允许携带cookie
        timeout: process.env.AXIOS_TIME_OUT, // 请求的超时时间
        withCredentials: true, // default false
    })

    return new Promise(function (resolve, reject) {
        // 执行异步ajax请求
        let promise = instance(config)
        promise.then(function (response) {
            // 成功了调用resolve()
            // console.log(response)
            // const data = response.data
            // 不成功同一提示,front end error info, not equals 0 and 200 means server internal error
            // if(data.state != 0 && data.state != 200){
            //     swal({
            //         title: data.msg,
            //         text: "state code: " + data.state + "，请重试",
            //         icon: "error", // "warning"
            //         button: false, // hidden button
            //         timer: 1000,
            //     });
            // }
            resolve(response.data)
        }).catch(function (error) {
            //失败了调用reject()
            reject(error)
            // swal({
            //     title: "error",
            //     text: "请重试",
            //     icon: "error", // "warning"
            //     button: false, // hidden button
            //     timer: 1000,
            // });
        })
    })
}