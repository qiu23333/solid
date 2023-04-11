
import { basename } from "path";
import { requests } from "./request";
import dayjs from "dayjs";

// 接口统一管理哎
// 验证码
export const getCaptchImage = () => {
    return requests({
        url: '/system/getCaptchaImage',
        method: 'post'
    })
}
// 登录
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
// 获取用户信息
export const getUserInfo=()=>{
    return requests({
        url:'/system/sysUser/getUserInfo',
        method:'post',
        headers:{
            Authorization:localStorage.getItem("tk")
        }
    })
}
// 登出
export const logout = ()=>{
    return requests({
        url:'/system/logout',
        method:'post'
    })
}
// 设备数据获取
export const getData = (p:number,ps:number,info?:object) => {
    // 查询模块
    if(info){
        const{baseName="", type="", itemNo=""}={...info}
        if(type!==""){
            return requests({
                url:'/device/deviceSub/pagesQueryDevice',
                method:'get',
                params:{
                    type:type,
                    baseName:baseName,
                    itemNo:itemNo,
                    current:p,
                    size:ps,
                    // _t:dayjs().format(),
                },
                headers:{
                    // connection:'keep-alive',
                    Authorization:localStorage.getItem("tk")
                }
            })
        }
        else {
            return requests({
                url:'/device/deviceSub/pagesQueryDevice',
                method:'get',
                params:{
                    baseName:baseName,
                    itemNo:itemNo,
                    current:p,
                    size:ps,
                    // _t:dayjs().format(),
                },
                headers:{
                    // connection:'keep-alive',
                    Authorization:localStorage.getItem("tk")
                }
            })
        }
    }
    // 数据请求
    return requests({
        url:'/device/deviceSub/pagesQueryDevice',
        method:'get',
        params:{
            current:p,
            size:ps,
            // _t:dayjs().format(),
        },
        headers:{
            // connection:'keep-alive',
            Authorization:localStorage.getItem("tk")
        }
    })
}
// 删除设备
export const removeItem = (ids:string)=>{
    return requests({
        url:'/device/deviceSub/removeDevice',
        method:'post',
        params:{
            ids:ids
        },
        headers:{
            Authorization:localStorage.getItem("tk")
        },
    })
}
