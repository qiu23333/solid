import { defineStore } from "pinia";
import { reactive } from "vue";

export interface LoginParams {
    grantType: string;
    username: string;
    password: string;
    mobile: string;
    captcha: string;
    code: string;
    verification?: string;
  }

export const userStore=defineStore({
    id:'user',
    state:()=>{
        let loginInfo = reactive({
            user:{
                id:'114514',
                pwd:'114514'
            },
            phone:''
        })
        let userInfo = reactive({
            id:'',
            phone:'',
            isLogin:false
        })
        return {
            loginInfo,
            userInfo
        }
    },
    actions:{
        login(){
            
            console.log("登录捏")
            this.userInfo.isLogin = true
        },
        logout(){
            console.log("下线咯")
            this.userInfo.isLogin = false
        }
    }
})