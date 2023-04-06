<template>
  <div>
    <n-space inline class="mt-5 space-x-2 font-sans">
    <div class="mt-2 ml-7 mr-96">设备管理</div>
    <div class="ml-72"></div>
    <div>
      <n-button class=" ml-96">新增设备</n-button>
      <n-button>删除设备</n-button>
    </div>
  </n-space>
  <n-data-table
    :columns="columns"
    :data="data"
    :pagination="pagination"
    class="mt-5"
  />
  </div>
  
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui';

const columns = [
  {
    type: "selection",
  },
  {
    title: "Name",
    key: "name",
  },
  {
    title: "Age",
    key: "age",
  },
  {
    title: "Address",
    key: "address",
  },
  {
    title: "Action",
    key: "actions",
    // rowSpan: (rowData, rowIndex) => (rowIndex === 0 ? 2 : 1),
    render(row) {
      return h(
        NButton,
        {
          size: "small",
          onClick: () => sendMail(row),
        },
        { default: () => "Send Email" }
      );
    },
  },
];
function sendMail(rowData) {
  console.log("send mail to " + rowData.name);
}

const data = Array.from({ length: 46 }).map((_, index) => ({
  key: index,
  name: `Edward King ${index}`,
  age: 32,
  address: `London, Park Lane no. ${index}`,
}));

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
