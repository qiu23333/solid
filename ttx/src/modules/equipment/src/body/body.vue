<template>
  <n-space class="relative w-11/12 h-auto m-auto bg-white">
    <n-space inline class="mt-2 space-x-2 font-sans">
      <div class="mt-2 ml-7">设备管理</div>
      <!-- <div class="ml-40"></div> -->
      <div class="absolute right-0">
        <n-button class="mr-5 bg-blue-400" @click="add" type="info"
          >新增设备</n-button
        >
        <n-button @click="del" class="mr-5 bg-red-400" type="error"
          >删除设备</n-button
        >
      </div>
    </n-space>
    <n-data-table
      remote
      :loading="loading"
      :columns="columns"
      :data="data"
      :bordered="false"
      :single-line="false"
      :max-height="473"
      :min-height="473"
      :row-key="rowKey"
      @update:checked-row-keys="handleCheck"
      class="relative mt-2 mb-6"
    />
    <pagination />
  </n-space>
</template>

<script setup lang="ts">
import { NButton } from "naive-ui";
import { equipmentStore } from "../store/equipment";
import { storeToRefs } from "pinia";
import { onMountedOrActivated } from "/@/hooks/core/onMountedOrActivated";
import pagination from "./pagination/pagination.vue";
import type { DataTableRowKey } from "naive-ui";

const equipment = equipmentStore();
let { data, loading } = storeToRefs(equipment);
const columns = [
  {
    type: "selection",
    // key:"id"
  },
  {
    title: "设备名称",
    key: "subName",
  },
  {
    title: "设备编号",
    key: "itemNo",
  },
  {
    title: "所属场站",
    key: "baseName",
  },
  {
    title: "设备类型",
    key: "type",
  },
  {
    title: "父级设备",
    key: "parentName",
  },
  {
    title: "操作",
    key: "actions",
    render(row: any) {
      return h(
        NButton,
        {
          text: true,
          type: "info",
          textColor: "blue",
          size: "small",
          onClick: () => sendMail(row),
        },
        { default: () => "编辑设备" }
      );
    },
  },
];
function rowKey(row: any) {
  // console.log(row)
  return row.id;
}
function handleCheck(rowKeys: DataTableRowKey[]) {
  equipment.checkedRowKeysRef = rowKeys.join(",");
  // console.log("#####"+equipment.checkedRowKeysRef)
}
function sendMail(rowData: any) {
  console.log("send mail to " + rowData.name);
}
function add() {
  equipment.addData();
}
function error(text: string) {
  console.log(text);
}
function success(text: string) {
  console.log(text);
}
async function del() {
  // handleClick()
  let res = await equipment.delData();
  if (res === true) {
    // uMessage('success','删除成功')
    success("删除成功");
  } else if (res === "message.exceptions.exception_17") {
    error("设备存在子设备，无法删除");
    // uMessage('error','设备存在子设备，无法删除')
  } else {
    error("别的错误捏");
    // uMessage('error','别的错误捏')
  }
}

onMountedOrActivated(() => {
  equipment.getData(1, 10);
});
</script>

<style scoped></style>
