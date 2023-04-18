<template>
  <div class="relative w-11/12 m-auto bg-white">
    <n-modal v-model:show="showModal" class="w-2/3 bg-white h-1/2">
      <div>
        <n-form
          class="relative font-sans"
          :bordered="false"
          size="medium"
          label-placement="left"
          label-width="110"
          :rules="rules"
        >
          <div class="mt-4 ml-5 text-lg">编辑设备</div>
          <n-divider class="bg-gary-500" />
          <n-grid :cols="24" :x-gap="2" collapsed-rows:5>
            <n-form-item-gi
              :span="12"
              path="type"
              label="类型选择"
              class="mt-5 ml-20 w-80"
            >
              <n-select
                clearable
                showRequireMark:true
                :options="typeOptions"
                v-model:value="changeInfo.type"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="设备编号" class="mt-5 w-80">
              <n-input disabled v-model:value="changeInfo.itemNo" clearable />
            </n-form-item-gi>
            <n-form-item-gi
              :span="12"
              path="subName"
              label="设备名称"
              class="mt-5 ml-20 w-80"
            >
              <n-input v-model:value="changeInfo.subName" clearable />
            </n-form-item-gi>
            <n-form-item-gi
              :span="12"
              path="host"
              label="通讯地址"
              class="mt-5 w-80"
            >
              <n-input v-model:value="changeInfo.host" clearable />
            </n-form-item-gi>
            <n-form-item-gi
              :span="12"
              path="port"
              label="端口号"
              class="mt-5 ml-20 w-80"
            >
              <n-input v-model:value="changeInfo.port" clearable />
            </n-form-item-gi>
            <n-form-item-gi
              :span="12"
              path="freq"
              label="采集步长"
              class="mt-5 w-80"
            >
              <n-input v-model:value="changeInfo.freq" clearable />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="父级设备" class="mt-5 ml-20 w-80">
              <n-select
                :options="parentNameOptions"
                v-model:value="changeInfo.parentId"
                clearable
              />
            </n-form-item-gi>
            <n-form-item-gi
              :span="12"
              path="protocol"
              label="协议类型"
              class="mt-5 w-80"
            >
              <n-select
                :options="dictItemProtocolOptions"
                v-model:value="changeInfo.protocol"
                clearable
              />
            </n-form-item-gi>
            <n-form-item-gi
              :span="12"
              path="model"
              label="设备型号"
              class="mt-5 ml-20 w-80"
            >
              <n-select
                :options="dictItemModelOptions"
                v-model:value="changeInfo.model"
                clearable
              />
            </n-form-item-gi>
            <n-form-item-gi
              :span="12"
              path="brand"
              label="设备厂商"
              class="mt-5 w-80"
            >
              <n-select
                :options="dictItemBrandOptions"
                v-model:value="changeInfo.brand"
                clearable
              />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="创建时间" class="mt-5 ml-20 w-80">
              <n-date-picker
                v-model:formatted-value="changeInfo.createTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                size="large"
                clearable
              />
            </n-form-item-gi>
            <n-form-item-gi
              :span="12"
              label="设备所属场站"
              path="baseName"
              class="mt-5 w-80"
              clearable
            >
              <n-select
                :options="baseNameOptions"
                v-model:value="changeInfo.orgId"
                clearable
              />
            </n-form-item-gi>
            <n-form-item-gi
              :span="12"
              path="slave"
              label="从站号"
              class="mt-5 ml-20 w-80"
            >
              <n-input v-model:value="changeInfo.slave" clearable />
            </n-form-item-gi>
          </n-grid>

          <div class="absolute bottom-0 mt-2 space-x-3 font-sans mb-7 right-10">
            <n-button
              type="primary"
              ghost
              text-color="black"
              @click="equipment.showModal = false"
            >
              取消
            </n-button>
            <n-button
              v-if="isadd"
              type="info"
              class="bg-blue-400"
              @click="handleTest"
            >
              链接测试
            </n-button>
            <n-button type="info" class="bg-blue-400" @click="handle">
              保存
            </n-button>
          </div>
          <n-divider class="mb-10 bg-gary-500" />
        </n-form>
      </div>
    </n-modal>
    <n-space class="relative bg-white">
      <n-space inline class="mt-2 space-x-2 font-sans">
        <div class="mt-2 ml-7">设备管理</div>
        <div class="absolute right-0">
          <n-space>
            <n-button class="bg-blue-400" @click="add" type="info"
              >新增设备</n-button>
            <n-button
              @click="handleConfirm"
              class="mr-5 bg-red-400"
              type="error"
              >删除设备</n-button>
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
import pagination from "./pagination/pagination.vue";
import type { DataTableRowKey } from "naive-ui";
import { dialog, message } from "/@/components/Dialog";
const equipment = equipmentStore();
let {
  data,
  loading,
  showModal,
  changeInfo,
  rules,
  parentNameOptions,
  dictItemProtocolOptions,
  baseNameOptions,
  dictItemModelOptions,
  dictItemBrandOptions,
} = storeToRefs(equipment);
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
let isadd = false;
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
  isadd = false;
  equipment.showModal = true;
  equipment.editItem(rowData.id);
}
function add() {
  isadd = true;
  equipment.showModal = true;
  equipment.add();
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
