<template>
  <div class="relative w-11/12 m-auto bg-white">
     <add-form class="absolute bg-green-500"/>
  <n-space class="relative bg-white">
    <n-space inline class="mt-2 space-x-2 font-sans">
      <div class="mt-2 ml-7">设备管理</div>
      <div class="absolute right-0">
        <n-space>
          <n-button class="bg-blue-400" @click="add" type="info"
            >新增设备</n-button
          >
          <n-button @click="handleConfirm" class="mr-5 bg-red-400" type="error"
            >删除设备</n-button
          >
        </n-space>
      </div>
    </n-space>
    <n-data-table
      remote
      :loading="loading"
      :columns="columns"
      :data="data"
      :bordered="false"
      :single-line="false"
      :max-height="423"
      :min-height="423"
      :row-key="rowKey"
      @update:checked-row-keys="handleCheck"
      class="mt-2 mb-6"
    />
    <pagination />
  </n-space>
  </div>
 
</template>

<script setup lang="ts">
import { NButton } from "naive-ui";
import { equipmentStore } from "../store/equipment";
import { storeToRefs } from "pinia";
import { onMountedOrActivated } from "/@/hooks/core/onMountedOrActivated";
import { getItem } from "/@/api";
import pagination from "./pagination/pagination.vue";
import addForm from "./form/addForm.vue";
import type { DataTableRowKey } from "naive-ui";
import { h } from "vue";
import { render } from "naive-ui/es/_utils";
import { dialog, message } from "/@/components/Dialog";
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
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: "设备编号",
    key: "itemNo",
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: "所属场站",
    key: "baseName",
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: "设备类型",
    key: "type",
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: "父级设备",
    key: "parentName",
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: "操作",
    key: "actions",
    ellipsis: {
      tooltip: true,
    },
    render(row: any) {
      return h(
        NButton,
        {
          text: true,
          type: "info",
          textColor: "rgba(9,83,203,0.7)",
          size: "small",
          onClick: () => Edit(row),
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
}
async function Edit(rowData: any) {
  // console.log("send mail to " + rowData.id);
  let res = await getItem(rowData.id);
  console.log(res.data);
  dialog.warning({
    title: "编辑设备",
    positiveText: "确定",
    closable: false,
    // showIcon:false,
    positiveButtonProps: {
      type: "success",
      // round: true,
      ghost: true,
    },
    negativeText: "取消",
    negativeButtonProps: {
      type: "warning",
      round: true,
      ghost: true,
    },
    onPositiveClick: () => {
      message.success("成了");
    },
    onNegativeClick: () => {
      message.warning("寄寄");
    },
  });
}
function add() {
  dialog.info({
    title: "新建设备",
    content:'666        ',
    showIcon:false,
    positiveText: "确定",
    closable: false,
    positiveButtonProps: {
      type: "success",
      ghost: true,
    },
    negativeText: "取消",
    negativeButtonProps: {
      type: "warning",
      ghost: true,
    },
    onPositiveClick: () => {
      message.success("成了");
    },
    onNegativeClick: () => {
      message.warning("取消新增");
    },
  });
  equipment.addData();
}
function handleConfirm() {
  dialog.warning({
    title: "警告",
    content: "删除数据可能会引起数据崩溃，是否确定删除？",
    maskClosable: false,
    positiveText: "确定",
    closable: false,
    // showIcon:false,
    positiveButtonProps: {
      type: "error",
      // round: true,
      ghost: true,
    },
    negativeText: "取消",
    negativeButtonProps: {
      type: "success",
      round: true,
      ghost: true,
    },
    onPositiveClick: () => {
      del();
    },
    onNegativeClick: () => {
      message.warning("取消删除");
    },
  });
}
async function del() {
  let res = await equipment.delData();
  if (res === true) {
    message.success("删除成功");
  } else if (res === "message.exceptions.exception_17") {
    message.error("设备存在子设备，无法删除");
  } else if (res === "message.exceptions.exception_69") {
    message.error("请先选择要删除的设备");
  } else {
    message.error("别的错误捏");
  }
}

onMountedOrActivated(async () => {
  await equipment.getData(1, equipment.pageSize);
});
</script>

<style scoped></style>
