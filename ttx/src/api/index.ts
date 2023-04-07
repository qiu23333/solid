import { requests } from "./request";

// 接口统一管理哎
export const getName=()=>{
    return requests({
        // 二次里面配置了baseurl，所以不用加api在路径前面嗷
        url:"/",
        // 请求类型
        method:'get'
    })
}
export const getInfo=(msg: object)=>{
    console.log(msg)
    return requests({
        url:'/'+ msg.url,
        method:'get',
    })
}

export const getCaptchImage=()=>{
    return requests({
        url:'/system/getCaptchaImage',
        method:'post'
    })
}

