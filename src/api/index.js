import request from './ajax'

export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    // 封装JSON
    data: {
      username,
      password
    }
  })
}