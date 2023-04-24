
import { requests } from "./request";

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
export const getUserInfo = () => {
    return requests({
        url: '/system/sysUser/getUserInfo',
        method: 'post',
        headers: {
            Authorization: localStorage.getItem("tk")
        }
    })
}
// 登出
export const logout = () => {
    return requests({
        url: '/system/logout',
        method: 'post'
    })
}
// 设备数据获取
export const getData = (p: number, ps: number, info?: object) => {
    // 查询模块
    if (info) {
        const { baseName = "", type = "", itemNo = "" } = { ...info }
        if (type !== "") {
            return requests({
                url: '/device/deviceSub/pagesQueryDevice',
                method: 'get',
                params: {
                    type: type,
                    baseName: baseName,
                    itemNo: itemNo,
                    current: p,
                    size: ps,
                    // _t:dayjs().format(),
                },
                headers: {
                    // connection:'keep-alive',
                    Authorization: localStorage.getItem("tk")
                }
            })
        }
        else {
            return requests({
                url: '/device/deviceSub/pagesQueryDevice',
                method: 'get',
                params: {
                    baseName: baseName,
                    itemNo: itemNo,
                    current: p,
                    size: ps,
                    // _t:dayjs().format(),
                },
                headers: {
                    // connection:'keep-alive',
                    Authorization: localStorage.getItem("tk")
                }
            })
        }
    }
    // 数据请求
    return requests({
        url: '/device/deviceSub/pagesQueryDevice',
        method: 'get',
        params: {
            current: p,
            size: ps,
            // _t:dayjs().format(),
        },
        headers: {
            // connection:'keep-alive',
            Authorization: localStorage.getItem("tk")
        }
    })
}
// 删除设备
export const removeItem = (ids: string) => {
    return requests({
        url: '/device/deviceSub/removeDevice',
        method: 'post',
        params: {
            ids: ids
        },
        headers: {
            Authorization: localStorage.getItem("tk")
        },
    })
}
// 编辑设备：详细信息查询
export const getItem = (id: any) => {
    return requests({
        url: `device/deviceSub/queryDeviceSubDetails/${id}`,
        method: 'get',
        params: {

        },
        headers: {
            Authorization: localStorage.getItem("tk")
        },
    })
}
// 获取新建设备编号
export const getDeviceNo = () => {
    return requests({
        url: 'device/deviceSub/getDeviceNo',
        method: 'get',
        headers: {
            Authorization: localStorage.getItem("tk")
        }
    })
}
// 获取父级设备列表
export const selectDeviceParent = () => {
    return requests({
        url: 'device/deviceSub/selectDeviceParent',
        method: 'get',
        headers: {
            Authorization: localStorage.getItem("tk")
        }
    })


}
// 获取协议类型列表
export const selectDeviceProtocol = () => {
    return requests({
        url: 'device/deviceSub/selectDeviceDictItem',
        method: 'get',
        headers: {
            Authorization: localStorage.getItem("tk")
        },
        params: {
            dictCode: 'device_protocol',
            dictName: '协议类型'
        }
    })
}
// 获取协议类型列表
export const selectDeviceModel = () => {
    return requests({
        url: 'device/deviceSub/selectDeviceDictItem',
        method: 'get',
        headers: {
            Authorization: localStorage.getItem("tk")
        },
        params: {
            dictCode: 'device_model',
            dictName: '设备型号'
        }
    })
}
// 获取设备厂商列表
export const selectDeviceBrand = () => {
    return requests({
        url: 'device/deviceSub/selectDeviceDictItem',
        method: 'get',
        headers: {
            Authorization: localStorage.getItem("tk")
        },
        params: {
            dictCode: 'device_brand',
            dictName: '品牌'
        }
    })
}
// 获取设备类型列表
export const selectDeviceType = () => {
    return requests({
        url: 'device/deviceSub/selectDeviceDictItem',
        method: 'get',
        headers: {
            Authorization: localStorage.getItem("tk")
        },
        params: {
            dictCode: 'device_type',
            dictName: '设备类型'
        }
    })
}
// 获取设备厂商列表
export const selectDeviceBaseName = () => {
    return requests({
        url: 'device/deviceOrg/selectBaseName',
        method: 'get',
        headers: {
            Authorization: localStorage.getItem("tk")
        },
        params: {

        }
    })
}
// 新增设备
export const addItem = (info: any) => {
    return requests({
        url: 'device/deviceSub/addDevice',
        method: 'post',
        headers: {
            Authorization: localStorage.getItem("tk")
        },
        // get参数
        // params: {
        //     ...info
        // },
        // post传参
        data: {
            ...info
        }
    })
}
// 更新（编辑）设备
export const updateItem = (info: any) => {
    return requests({
        url: 'device/deviceSub/updateSysDept',
        method: 'post',
        headers: {
            Authorization: localStorage.getItem("tk")
        },
        // get参数
        // params: {
        //     ...info
        // },
        // post传参
        data: {
            ...info
        }
    })
}
// 测试链接
export const testConnect = (info:any)=>{
    return requests({
        url:'device/deviceModbus/testConnect',
        method: 'get',
        headers: {
            Authorization: localStorage.getItem("tk")
        },
        // get参数
        params: {
            ...info
        },
        // post传参
        // data: {
        //     ...info
        // }
    })
}
