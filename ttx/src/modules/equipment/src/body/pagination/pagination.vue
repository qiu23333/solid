<template>
  <div class="absolute bottom-0 right-0 mt-2 ">
    <n-space inline class="font-sans text-center">
      <div class="mt-1">共{{all}}条数据</div>
    <n-pagination
      v-model:page="page"
      v-model:page-size="pageSize"
      :page-count="total"
      show-quick-jumper
      show-size-picker
      :on-update:page="onChange"
      :on-update:page-size="onUpdatePageSize"
      :page-sizes="[10, 15, 20]"
    />
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { eq } from "lodash";
import { equipmentStore } from "../../store/equipment";
import { storeToRefs } from "pinia";
const equipment = equipmentStore();
let { total, page, pageSize, all } = storeToRefs(equipment);

function onChange(page: number) {
  equipment.getData(page);
  equipment.page = page
}
function onUpdatePageSize(pageSize: number) {
  equipment.getData(0, pageSize);
  equipment.pageSize = pageSize;
  equipment.page = 1;
}
</script>

<style scoped></style>
