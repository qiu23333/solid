<template>
  <div class="relative w-11/12 h-20 m-auto mt-10 bg-white">
    <n-space inline class="mt-5 font-sans text-center">
      <div class="mt-2 ml-20">场站</div>
      <n-input
        round
        placeholder="请输入"
        clearable
        v-model:value="searchInfo.baseName"
        class="w-52"
      />
      <div class="mt-2 ml-28">设备类型</div>
      <n-select
        v-model:value="searchInfo.type"
        :options="options"
        clearable
        class="w-52"
      />
      <div class="mt-2 ml-24">设备编号</div>
      <n-input
        round
        placeholder="请输入"
        clearable
        v-model:value="searchInfo.itemNo"
        class="w-52"
      />
      <div class="absolute right-0">
        <n-button class="mr-5" @click="reset">重置</n-button>
        <n-button
          @click="equipment.search(searchInfo)"
          class="mr-5 bg-blue-400"
          type="info"
          >查询</n-button
        >
      </div>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { equipmentStore } from "../store/equipment";
import { storeToRefs } from "pinia";
const equipment = equipmentStore();
let { searchInfo } = storeToRefs(equipment);
let options = reactive([
  {
    label: "tcu",
    value: "7",
  },
  {
    label: "ncu",
    value: "6",
  },
]);

function reset() {
  equipment.searchInfo.baseName = "";
  equipment.searchInfo.type = "";
  equipment.searchInfo.itemNo = "";
  equipment.getData(0, equipment.pageSize);
}
</script>

<style scoped></style>
