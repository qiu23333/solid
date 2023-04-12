<template>
    <n-space>
        <Eform :inline="true" :class='fromClass' :lable-width='80' :items="fromItems" />
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
// import { NInput, NButton, } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { userStore } from '../store/sys/user';
import { useRouter } from 'vue-router';
import Eform from '../components/Form/form.vue';
import { NTag } from 'naive-ui';
import { h } from 'vue'
const user = userStore()
const router = useRouter()
const fromClass ='bg-gray-100 m-auto'
const fromItems= [
    {
        name:'name',
        path:'user.name',  
    },
    {
        name:'age',
        path:'user.path'
    },
    {
        name:'address',
        path:'user.path'
    },
    {
        name:'action',
        render (row) {
        const tags = row.tags.map((tagKey) => {
          return h(
            NTag,
            {
              style: {
                marginRight: '6px'
              },
              type: 'info',
              bordered: false
            },
            {
              default: () => tagKey
            }
          )
        })
        return tags
      }
    }
]
let { loginInfo } = storeToRefs(user)
function login() {
    user.login()
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