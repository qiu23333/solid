
import { requests } from "./request";
import dayjs from "dayjs";

// 接口统一管理哎
export const getName = () => {
    return requests({
        // 二次里面配置了baseurl，所以不用加api在路径前面嗷
        url: "/",
        // 请求类型
        method: 'get'
    })
}
export const getInfo = (msg: object) => {
    // console.log(msg)
    return requests({
        url: '/' + msg.url,
        method: 'get',
    })
}

export const getCaptchImage = () => {
    return requests({
        url: '/system/getCaptchaImage',
        method: 'post'
    })
}
export const login = (c: any, v: any) => {
    return requests({
        url: '/system/login',
        method: 'post',
        data: {
            captcha: c,
            grantType: '1',
            password: 'Tx12345678',
            phoneLocationCode: '86',
            username: '18888888888',
            verification: v
        }
    })
}
export const getUserInfo=()=>{
    return requests({
        url:'/system/sysUser/getUserInfo',
        method:'post',
        headers:{
            Authorization:localStorage.getItem("tk")
        }
    })
}
export const logout = ()=>{
    return requests({
        url:'/system/logout',
        method:'post'
    })
}
export const getData = () => {
    return requests({
        url:'/device/deviceSub/pagesQueryDevice',
        method:'get',
        params:{
            current:1,
            size:10,
            // _t:dayjs().format(),
        },
        headers:{
            connection:'keep-alive',
            Authorization:localStorage.getItem("tk")
        }
    })
}
