<script setup lang="ts">
import { NButton, NResult } from 'naive-ui'
import { reactive } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

let userInfo  = reactive({
  userid:'666',
  pwd:'114514'
})

</script>

<template>
  <n-result status="404" title="404 资源不存在" description="生活总归带点荒谬">
    <template #footer>
      <n-button >找点乐子吧</n-button>
    </template>
  </n-result>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
