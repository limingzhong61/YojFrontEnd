/*
ap request url in a instance of axios
*/
import request, {specificRequest} from './ajax'
import * as Swal from "sweetalert2";
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
export function toLogin(params) {
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
// --------------------Problem ------------------------

/**
 *
 * @param pid
 */
export function deleteProblem(pid) {
    return request({
        url: "problem/" + pid,
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
// ===============================  Contest    ===============================
/**
 *
 * @param pageNumber page number
 * @returns {*|Promise|Promise<any>|Window.Promise}
 */
export function getContestList(pageNumber) {
    return request({
        url: "/contest/set/" + pageNumber,
        method: "GET"
    })
}

/**
 *
 * @param cid contest id
 * @returns {*|Promise|Promise<any>|Window.Promise}
 */
export function getContestView(cid) {
    return request({
        url: "/contest/view/" + cid,
        method: "GET",
    })
}

/**
 *
 * @param pageNumber page Number
 * @param cid contest id
 * @returns {*|Promise|Promise<any>|Window.Promise}
 */
export function getContestProblem(pageNumber,cid) {
    return request({
        url: "/contest/contestProblem/" + pageNumber,
        method: "GET",
        params: {cid: cid}
    })
}
/**
 *
 * @param pageNumber page Number
 * @param cid contest id
 * @returns {*|Promise|Promise<any>|Window.Promise}
 */
export function getContestRank(pageNumber,cid) {
    return request({
        url: "/contest/contestRank/" + pageNumber,
        method: "GET",
        params: {cid: cid}
    })
}

// ===============================  Contest    ===============================


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
export function updateContest(data) {
    return request({
        url: "admin/contest/alter",
        method: "PUT",
        data: data
    })
}

// --------------------Admin ------------------------

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

export function reSubmitSolution(sid) {
    return request({
        url: "/solution/reSubmit/" + sid,
        method: "get",
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

export function downloadJudgeFile(params) {
    return specificRequest({
        method: "get",
        url: "/data/get",
        params: params,
        responseType: 'blob'
    }).then((res) => {
        //这里res.data是返回的blob对象
        var blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.wordprocessingml.document这里表示doc类型
        console.log(blob)
        if (blob.size == 0) {
            Swal.fire({
                title: "Error",
                text: "下载次数过多",
                icon: "warning"
            });
        }
        var contentDisposition = res.headers['content-disposition'];  //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
        console.log(contentDisposition)
        var patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
        var result = patt.exec(contentDisposition);
        var filename = result[1];
        var downloadElement = document.createElement('a');
        var href = window.URL.createObjectURL(blob); //创建下载的链接
        downloadElement.style.display = 'none';
        downloadElement.href = href;
        downloadElement.download = filename; //下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); //点击下载
        document.body.removeChild(downloadElement); //下载完成移除元素
        window.URL.revokeObjectURL(href); //释放掉blob对象
    })
}