<template>
  <div class="relative w-11/12 h-16 m-auto mt-6 bg-white">
    <n-space inline class="mt-4 font-sans text-center">
      <div class="mt-2 ml-5">场站</div>
      <n-input
        placeholder="请输入"
        clearable
        v-model:value="searchInfo.baseName"
        class="w-52"
      />
      <div class="mt-2 ml-5">设备类型</div>
      <n-select
        v-model:value="searchInfo.type"
        :options="options"
        clearable
        class="w-52"
      />
      <div class="mt-2 ml-5">设备编号</div>
      <n-input
        placeholder="请输入"
        clearable
        v-model:value="searchInfo.itemNo"
        class="w-52"
      />
      <div class="absolute right-0 flex">
        <n-button class="mr-3" @click="reset">重置</n-button>
        <n-spin :show="loading">
          <n-button
          @click="equipment.search(searchInfo)"
          class="mr-5 bg-blue-400"
          type="info"
          >查询</n-button
        >
        </n-spin>
      </div>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { equipmentStore } from "../store/equipment";
import { storeToRefs } from "pinia";
const equipment = equipmentStore();
let { searchInfo, loading } = storeToRefs(equipment);
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
  equipment.searchInfo.type = null;
  equipment.searchInfo.itemNo = "";
  equipment.getData(0, equipment.pageSize);
}
</script>

<style scoped></style>
