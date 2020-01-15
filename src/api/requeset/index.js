/*
ap request url in a instance of axios
*/
import request from './ajax'
// ===============================  Contest    ===============================
/**
 *
 * @param pageNumber page number
 * @param data
 * @returns {*|Promise|Promise<any>|Window.Promise}
 */
export function getContestList(pageNumber,data){
    return request({
        url: "/contest/set/"+pageNumber,
        method: "GET"
    })
}

/**
 *
 * @param cid contest id
 * @returns {*|Promise|Promise<any>|Window.Promise}
 */
export function getContestView(cid){
    return request({
        url: "/contest/view/"+cid,
        method: "GET"
    })
}


// ===============================  Contest    ===============================

// ===============================  User    ===============================
/**
 * 获取用户信息的实例
 * @returns {*|Promise<any>|Window.Promise}
 */
export function getCurrentUserInfo() {
    return request({
        url: "/user/currentInfo",
        method: "GET"
    })
}

/**
 * update user info
 * @returns {*|Promise<any>|Promise|Window.Promise}
 */
export function updateUserInfo(data) {
    return request({
        url: "/user/update",
        method: "PUT",
        data: data
    })
}

//登录 data对象{}
export function toLogin(params, data) {
    return request({
        url: "/login",
        method: "post",
        params: params,
        // data: data
    })
}

export function logout() {
    return request({
        url: "/logout",
        method: "post"
    })
}

/**
 * get reset password verfiy code of email
 * @param {string} email  email address
 */
export function getResetPasswordEmailCode(email) {
    return request({
        url: "/user/reset/emailCode/" + email
    })
}

/**
 * reset user password
 * @param {object} data
 */
export function resetPassword(data) {
    return request({
        url: "/user/reset/password",
        method: "POST",
        data: data
    })
}

/**
 *
 * @param {int} uid
 */
export function getUserInfo(uid) {
    return request({
        url: "/user/info/" + uid,
    })
}

/**
 *
 * @param {int} pageNumber
 * @param {object} params
 */
export function getUserSet(pageNumber, params) {
    return request({
        url: "/user/set/" + pageNumber,
        params: params
    })
}

/**
 * get register email code
 * @param {string} email
 */
export function getRegisterEmailCode(email) {
    return request({
        url: "/user/r/getEmailCheckCode/" + email
    })
}

export function register(data) {
    return request({
        url: "/user/r/register",
        method: "POST",
        data: data
    })
}
// --------------------Admin ------------------------
/**
 *
 * @param
 */
export function updateAllProblemFile() {
    return request({
        url: "admin/updateAllProblemFile",
        method: "GET"
    })
}

// get all problem info
export function getProblemAll(pid) {
    return request({
        url: "admin/problem/" + pid,
        method: "get"
    })
}

/**
 * add contest
 * @param data
 * @returns {*|Promise|Promise<any>|Window.Promise}
 */
export function addContest(data) {
    return request({
        url: "admin/contest/add",
        method: "POST",
        data: data
    })
}

/**
 * update contest with admin authority
 * @param cid
 * @returns {*|Promise|Promise<any>|Window.Promise}
 */
export function updateContest(data){
    return request({
        url: "admin/contest/alter",
        method: "PUT",
        data: data
    })
}

// --------------------Admin ------------------------

// --------------------Problem ------------------------

/**
 *
 * @param pid
 */
export function deleteProblem(pid) {
    return request({
        url: "problem/"+ pid,
        method: "DELETE"
    })
}

//add problem
export function addProblem(data) {
    return request({
        url: "/problem/add",
        method: "POST",
        data: data
    })
}

// alter problem
export function alterProblem(data) {
    return request({
        url: "/problem/alter",
        method: "PUT",
        data: data
    })
}

// get problem
export function getProblemView(pid) {
    return request({
        url: "/problem/" + pid,
        method: "get"
    })
}


/**
 * get problem set
 * @param {page number} pageNumber
 * @param {*} params
 */
export function getProblemSet(pageNumber, params) {
    return request({
        url: "/problem/getProblemSet/" + pageNumber,
        params: params
    })
}

// ------------------------- Solution --------------------------
/**
 * submit solution
 * @param {*} solution
 */
export function submitSolution(solution) {
    return request({
        url: "/solution/submit",
        method: "post",
        data: solution
    })
}

export function solutionDetail(sid) {
    return request({
        url: "/solution/detail/" + sid,
        method: "get"
    })
}

/**
 *
 * @param {page number} pageNumber
 * @param {search params} params
 */
export function getSolutionSet(pageNumber, params) {
    return request({
        url: "/solution/set/" + pageNumber,
        method: "get",
        params: params
    })
}


// ================== Other ==========================
/**
 * get verify code
 */
export function getImageCode() {
    return request({
        url: "/verify/image",
        method: "get",
        responseType: "arraybuffer"
    })
}