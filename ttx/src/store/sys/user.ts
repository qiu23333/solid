import { defineStore } from "pinia";
import { reactive } from "vue";
import { login, logout, getUserInfo, getCaptchImage } from "../../api/index";

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
            if (res.data.code == 400) {
                getCaptchImage()
                this.loginInfo.user.captcha = ''
                return null
            } else {
                localStorage.setItem("tk", res.data.token || null)
                console.log("登录捏")
                // console.log(res.data.token)
                console.log(localStorage.getItem("tk"))
                this.userInfo.isLogin = true
                let re = await getUserInfo()
                this.userInfo = { ...this.userInfo, ...re.data }
                console.log("re:" + re.data)
                // return this.afterLogin()
            }
        },
        async afterLogin() {

            if (localStorage.getItem("tk")) {
                this.userInfo.isLogin = true
            } else {
                alert("真成了？")
                return null
            }
        },
        async logout() {
            await logout()
            localStorage.removeItem("tk")
            this.userInfo.isLogin = false
        }
    }
})