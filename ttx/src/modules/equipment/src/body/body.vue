<template>
    <div class="relative w-11/12 m-auto bg-white">
      <Emodal  ref="mod" :title="title" class="w-2/3"/>
      <n-space class="relative bg-white">
        <n-space inline class="mt-2 space-x-2 font-sans">
          <div class="mt-2 ml-7">设备管理</div>
          <div class="absolute right-0">
            <n-space>
              <n-button class="bg-blue-400" @click="add" type="info"
                >新增设备</n-button
              >
              <n-button
                @click="handleConfirm"
                class="mr-5 bg-red-400"
                type="error"
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
// @ts-ignore
import { onMountedOrActivated } from "/@/hooks/core/onMountedOrActivated";
import pagination from "./pagination/pagination.vue";
import type { DataTableRowKey } from "naive-ui";
// @ts-ignore
import { dialog, message } from "/@/components/Dialog";
import Emodal from './modal/Emodal.vue'

import {
  getDeviceNo,
  selectDeviceBaseName,
  selectDeviceBrand,
  selectDeviceModel,
  selectDeviceParent,
  selectDeviceProtocol,
  // @ts-ignore
} from "/@/api";
import { useModal } from "../../../../components/Modal";
import { FormSchema } from "../../../../components/Form";
// import { array } from "vue-types";
const equipment = equipmentStore();
let { data, loading, showModal, changeInfo, isadd } = storeToRefs(equipment);
let typeOptions = reactive([
  {
    label: "tcu",
    value: "7",
  },
  {
    label: "ncu",
    value: "6",
  },
]);
let title = null;
let addNo = ref(114514);
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

const mod = ref<InstanceType<typeof Emodal>>()

function rowKey(row: any) {
  // console.log(row)
  return row.id;
}
function handleCheck(rowKeys: DataTableRowKey[]) {
  equipment.checkedRowKeysRef = rowKeys.join(",");
}
async function Edit(rowData: any) {
  equipment. isadd = false;
  // equipment.showModal = true;
  mod.value?.openModal()
  // id = rowData.id;
  // equipment.editItem(rowData.id);
}

async function getItemNo() {
  const res = await getDeviceNo();
  return res.data;
}
async function add() {
  equipment. isadd  = true;
  // openModal()
  mod.value?.openModal()
  equipment.showModal = true;
  addNo = (await getDeviceNo()).data;
  console.log(addNo);
  // 获取父级设备列表
  // let res1 = await selectDeviceParent();
  // parentNameOptions = res1.data.map((i: { subName: any; id: any }) => {
  //   return {
  //     label: i.subName,
  //     value: i.id,
  //   };
  // });
  // 获取协议类型
  // let res2 = await selectDeviceProtocol();
  // dictItemProtocolOptions = res2.data.map(
  //   (i: { dictItemName: any; dictItemCode: any }) => {
  //     return {
  //       label: i.dictItemName,
  //       value: i.dictItemCode,
  //     };
  //   }
  // );
  // // 获取设备型号
  // let res3 = await selectDeviceModel();
  // dictItemModelOptions = res3.data.map(
  //   (i: { dictItemName: any; dictItemCode: any }) => {
  //     return {
  //       label: i.dictItemName,
  //       value: i.dictItemCode,
  //     };
  //   }
  // );
  // // 获取设备厂商
  // let res4 = await selectDeviceBrand();
  // dictItemBrandOptions = res4.data.map(
  //   (i: { dictItemName: any; dictItemCode: any }) => {
  //     return {
  //       label: i.dictItemName,
  //       value: i.dictItemCode,
  //     };
  //   }
  // );
  // // 获取所属场站
  // let res5 = await selectDeviceBaseName();
  // baseNameOptions = res5.data.map((i: { baseName: any; id: any }) => {
  //   return {
  //     label: i.baseName,
  //     value: i.id,
  //   };
  // });
}

async function handle() {
  if (isadd == true) {
    let res = await equipment.addItem();
    if (res == true) {
      equipment.showModal = false;
      equipment.getData(1, equipment.pageSize);
    }
  } else {
    let res = await equipment.updateItem();
    if (res == true) {
      equipment.showModal = false;
      equipment.getData(equipment.page, equipment.pageSize);
    }
  }
}
async function handleTest() {
  await equipment.test();
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
