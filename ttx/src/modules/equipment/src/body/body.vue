<template>
  <div class="w-11/12 ml-auto mr-auto bg-white h-evo">
    <Emodal ref="mod" class="w-2/3" />
    <n-space vertical class="relative ">
      <n-space inline class="h-10 mt-2 space-x-2 font-sans ">
        <div class="ml-5">设备管理</div>
        <div class="absolute right-0">
          <n-space>
            <n-button class="bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-500" @click="add" type="info"
              >新增设备</n-button
            >
            <n-button
              @click="handleConfirm"
              class="mr-5 bg-gradient-to-r from-purple-400 to-red-500 hover:from-red-500 hover:to-purple-500"
              type="info"
              >删除设备</n-button
            >
          </n-space>
        </div>
      </n-space>
    </n-space>
    <n-data-table
        remote
        :loading="loading"
        :columns="columns"
        :data="data"
        :bordered="false"
        :single-line="false"
        flex-height
        :row-key="rowKey"
        @update:checked-row-keys="handleCheck"
        :pagination="pagination"
        class="h-full text-center"
      />
  </div>
</template>
<script setup lang="ts">
import { NButton } from "naive-ui";
import { equipmentStore } from "../store/equipment";
import { storeToRefs } from "pinia";
// @ts-ignore
import { onMountedOrActivated } from "/@/hooks/core/onMountedOrActivated";
import type { DataTableRowKey } from "naive-ui";
// @ts-ignore
import { dialog, message } from "/@/components/Dialog";
import Emodal from "./modal/Emodal.vue";
// @ts-ignore
import { removeItem } from "/@/api";
const equipment = equipmentStore();
let { data, loading, total, page, pageSize, all } = storeToRefs(equipment);
const columns = [
  {
    type: "selection",
    align:'center',
    // key:"id"
  },
  {
    title: "设备名称",
    key: "subName",
    align:'center',
    ellipsis: {
      // 折叠后提示
      tooltip: true,
    },
  },
  {
    title: "设备编号",
    key: "itemNo",
    align:'center',
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: "所属场站",
    key: "baseName",
    align:'center',
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: "设备类型",
    key: "type",
    align:'center',
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: "父级设备",
    key: "parentName",
    align:'center',
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: "操作",
    key: "actions",
    align:'center',
    width:'120px',
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
let pagination = reactive({
  page: page.value,
  pageSize: pageSize.value,
  pageCount: total,
  showSizePicker: true,
  showQuickJumper: true,
  pageSizes: [10, 15, 20],
  onChange: (page: number) => {
    equipment.getData(page);
    equipment.page = page;
    pagination.page = page;
  },
  onUpdatePageSize: (pageSize: number) => {
    equipment.getData(0, pageSize);
    equipment.pageSize = pageSize;
    pagination.pageSize = pageSize
    equipment.page = 1;
  },
});
const mod = ref<InstanceType<typeof Emodal>>();
function rowKey(row: any) {
  // console.log(row)
  return row.id;
}
function handleCheck(rowKeys: DataTableRowKey[]) {
  equipment.checkedRowKeysRef = rowKeys.join(",");
}
async function Edit(rowData: any) {
  equipment.isadd = false;
  mod.value?.getModal(rowData.id);
}
async function add() {
  equipment.isadd = true;
  await mod.value?.getData();
  mod.value?.openModal();
}
function handleConfirm() {
  dialog.warning({
    title: "警告",
    content: "删除数据可能会引起数据崩溃，是否确定删除？",
    maskClosable: false,
    positiveText: "确定",
    closable: false,
    positiveButtonProps: {
      type: "error",
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
  let res = await removeItem(equipment.checkedRowKeysRef);
  if (res.data === true) {
    message.success("删除成功");
    equipment.getData(1, equipment.pageSize);
    // @ts-ignore
  } else if (res.msg === "message.exceptions.exception_17") {
    message.error("设备存在子设备，无法删除");
    // @ts-ignore
  } else if (res.msg === "message.exceptions.exception_69") {
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
