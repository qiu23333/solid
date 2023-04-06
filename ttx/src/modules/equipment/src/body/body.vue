<template>
  <div>
    <n-space inline class="mt-5 space-x-2 font-sans">
      <div class="mt-2 ml-7 mr-96">设备管理</div>
      <div class="ml-96"></div>
      <div class="ml-20"></div>
      <div>
        <n-button class="ml-96" @click="add">新增设备</n-button>
        <n-button @click="del">删除设备</n-button>
      </div>
    </n-space>
    <n-data-table
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :bordered="false"
      :single-line="false"
      :max-height="2500"
      class="mt-5"
    />
  </div>
</template>

<script setup lang="ts">
import { NButton } from "naive-ui";
import { equipmentStore } from "../store/equipment";
import { storeToRefs } from "pinia";

const equipment = equipmentStore()

let { data } = storeToRefs(equipment)

const columns = [
  {
    type: "selection",
  },
  {
    title: "设备名称",
    key: "name",
    width: 270,
  },
  {
    title: "设备编号",
    key: "id",
    width: 270,
  },
  {
    title: "所属场站",
    key: "address",
    width: 270,
  },
  {
    title: "设备类型",
    key: "type",
    width: 270,
  },
  {
    title: "父级设备",
    key: "father",
    width: 270,
  },
  {
    title: "操作",
    key: "actions",
    render(row:any) {
      return h(
        NButton,
        {
          size: "small",
          onClick: () => sendMail(row),
        },
        { default: () => "编辑设备" }
      );
    },
  },
];

function sendMail(rowData:any) {
  console.log("send mail to " + rowData.name);
}
function add(){
  equipment.addData()
}
function del(){
  equipment.delData()
}
const pagination = reactive({
  page: 2,
  pageSize: 5,
  showSizePicker: true,
  pageSizes: [3, 5, 7],
  onChange: (page: number) => {
    pagination.page = page;
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
  },
});
</script>

<style scoped></style>
