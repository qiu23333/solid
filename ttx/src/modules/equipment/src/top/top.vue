<template>
  <div class="relative w-11/12 m-auto mt-10">
    <n-space inline class="font-sans text-center">
      <div class="mt-2 ml-28">场站</div>
      <n-input
        round
        placeholder="请输入"
        v-model:value="searchInfo.place"
        class="w-52"
      />
      <div class="mt-2 ml-28">设备类型</div>
      <n-select
        v-model:value="searchInfo.value"
        :options="options"
        class="w-52"
      />
      <div class="mt-2 ml-24">设备编号</div>
      <n-input
        round
        placeholder="请输入"
        v-model:value="searchInfo.id"
        class="w-52"
      />
      <div class="absolute right-0">
        <n-button class="">重置</n-button>
      <n-button @click="equipment.search(searchInfo)">查询</n-button>
      </div>
      
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { equipmentStore } from "../store/equipment";

const equipment = equipmentStore();
let searchInfo = reactive({
  place: "",
  value: "",
  id: "",
});
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
