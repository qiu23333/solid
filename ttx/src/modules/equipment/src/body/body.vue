<template>
  <div class="relative w-11/12 m-auto bg-white">
    <n-space inline class="mt-2 space-x-2 font-sans">
      <div class="mt-2 ml-7">设备管理</div>
      <!-- <div class="ml-40"></div> -->
      <div class="absolute right-0">
        <n-button class="mr-5 bg-blue-400" @click="add" type="info">新增设备</n-button>
        <n-button @click="del" class="mr-5 bg-red-400" type="error">删除设备</n-button>
      </div>
    </n-space>
    <n-data-table
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :bordered="false"
      :single-line="false"
      :max-height="450"
      class="mt-2"
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
  },
  {
    title: "设备编号",
    key: "id",
  },
  {
    title: "所属场站",
    key: "address",
  },
  {
    title: "设备类型",
    key: "type",
  },
  {
    title: "父级设备",
    key: "father",
  },
  {
    title: "操作",
    key: "actions",
    render(row:any) {
      return h(
        NButton,
        {
          text:true,
          type:"info",
          textColor:"blue",
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
  // handleClick()
  equipment.delData()
}
const pagination = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 15, 20],
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
