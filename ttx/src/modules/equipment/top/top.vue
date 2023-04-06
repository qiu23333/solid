<template>
  <div class="bg-green-200 w-52 ">这里是equipment</div>
  <n-space inline class="font-sans text-center">
    <div class="mt-2 ml-20 bg-red-200">场站</div>
    <n-input round placeholder="请输入" class="w-52" />
    <div class="mt-2 ml-20">设备类型</div>
    <n-select v-model:value="value" :options="options" class="w-52" />
    <div class="mt-2 ml-20">设备编号</div>
    <n-input round placeholder="请输入" class="w-52" />
    <n-button class="ml-52">重置</n-button>
    <n-button>查询</n-button>
  </n-space>
</template>

<script setup lang="ts">
let value = ref(null);
let options = reactive([
  {
    label: "woc",
    value: 114,
  },
  {
    label: "热烈的🐎",
    value: 514,
  },
]);
</script>

<style scoped></style>
