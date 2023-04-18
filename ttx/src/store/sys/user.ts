import { defineStore } from "pinia";
import { reactive } from "vue";
import { login, logout, getUserInfo, getCaptchImage } from "../../api/index";
import { message } from "/@/components/Dialog";
export interface LoginParams {
    grantType: string;
    username: string;
    password: string;
    mobile: string;
    captcha: string;
    code: string;
    verification?: string;
}

export const userStore = defineStore({
    id: 'user',
    state: () => {
        let loginInfo = reactive({
            user: {
                id: '114514',
                pwd: '114514',
                captcha: ''
            },
            phone: ''
        })
        let userInfo = reactive({
            id: '',
            phone: '',
            isLogin: false
        })
        return {
            loginInfo,
            userInfo
        }
    },
    actions: {
        async login(v: globalThis.Ref<string>) {
            const res = await login(this.loginInfo.user.captcha, v.value)
            if (res.data == '') {
                getCaptchImage()
                this.loginInfo.user.captcha = ''
                message.error('登录失败')
                // return null
            } else {
                localStorage.setItem("tk", res.data.token || null)
                console.log(localStorage.getItem("tk"))
                message.success('登录成功')
                this.userInfo.isLogin = true
                let re = await getUserInfo()
                this.userInfo = { ...this.userInfo, ...re.data }
            }
        },
        async logout() {
            await logout()
            localStorage.removeItem("tk")
            this.userInfo.isLogin = false
        }
    }
})