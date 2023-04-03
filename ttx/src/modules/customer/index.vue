<template>
  <n-button @click="jump">跳转</n-button>
  <n-button @click="logout">logout</n-button>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'
import { useRouter } from 'vue-router';
import { userStore } from '../../store/sys/user'
const router = useRouter()
const user = userStore()
function jump(){
  router.push({
    name:'equipment',
    path:'/equipment'
  })
}
function logout(){
  user.logout()
  if(!user.userInfo.isLogin){
    router.push({
    name:'Login',
    path:'/'
  })
  } else {
    alert("下线还能失败的？")
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
