// 判题结果映射
// export const JUDGE_RESULT = [
//     'Accepted',
//     'PresentationError',
//     'TimeLimitExceeded',
//     'MemoryLimitExceeded',
//     'WrongAnswer',
//     'RuntimeError',
//     'OutputLimitExceeded',
//     'CompileError',
//     'SystemError',
//     'Judging',
// ]
// user Chinese is less length than English
export const JUDGE_RESULT = [
    '正确', //0
    '正确', //1
    // '格式错误', //1 ，删除此类型，便于用户专注于代码本身
    '运行超时', //2
    '内存超限', //3
    '答案错误', //4
    '运行错误',//5
    '输出超限',//6
    '编译错误',//7
    '系统错误',//8
    '判定中',//9
    '等待重判',//10
]
export const JUDGE_LANGUAGE = [
    'C',
    'C++',
    'JAVA',
    'Python',
]

export const ROLE_NAME = {
    'ADMIN': "ADMIN"
}