<script setup lang="ts">
import { NButton, NResult } from 'naive-ui'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user';


const router = useRouter()
const user = useUserStore()

function Login(userInfo:object) {
  router.push({
    path:'/station',
    name:'station',
  })
}
</script>

<template>
  <n-result status="404" title="404 资源不存在" description="生活总归带点荒谬">
    <template #footer>
      <n-button @click="Login">找点乐子吧</n-button>
    </template>
  </n-result>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
