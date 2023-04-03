<template>
    <n-space>
        <div>账号
            <n-input type="text" placeholder="可以清除" clearable v-model:value="loginInfo.user.id" class="w-20" />
        </div>
        <div>密码
            <n-input type="password" placeholder="可以清除" clearable v-model:value="loginInfo.user.pwd" />
        </div>
    </n-space>
    <n-button @click="login" class="w-20 h-10 antialiased italic text-center bg-green-200 ">login</n-button>
</template>

<script setup lang="ts">
import { NInput, NButton, } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { userStore } from '../store/sys/user';
import { useRouter } from 'vue-router';

const user = userStore()
const router = useRouter()
let { loginInfo } = storeToRefs(user)
async function login() {
    await user.login()
    if (user.userInfo.isLogin) {
        router.push({
            name: 'customer',
            path: '/cuntomer'
        })
    }
    else { 
        console.log(user.userInfo.isLogin)
        alert("过不去嗷，傻杯") 
    }
}
</script>

<style scoped></style>