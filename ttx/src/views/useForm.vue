<template>
  <div>
    <n-card :bordered="false" class="mt-4 proCard">
      <div class="BasicForm">
        <BasicForm
          @register="register"
          @submit="handleSubmit"
          @reset="handleReset"
        >
          <template #statusSlot="{ model, field }">
            <n-input v-model:value="model[field]" />
          </template>
        </BasicForm>
      </div>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import { BasicForm, FormSchema, useForm } from "/@/components/Form/index";
// @ts-ignore
import { message } from "/@/components/Dialog";
const schemas: FormSchema[] = [
  {
    field: "name",
    component: "NInput",
    label: "姓名",
    labelMessage: "这是一个提示",
    giProps: {
      span: 1,
    },
    componentProps: {
      placeholder: "请输入姓名",
      onInput: (e: any) => {
        console.log(e);
      },
    },
    rules: [{ required: true, message: "请输入姓名", trigger: ["blur"] }],
  },
  {
    field: "mobile",
    component: "NInputNumber",
    label: "手机",
    componentProps: {
      placeholder: "请输入手机号码",
      showButton: false,
      onInput: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: "type",
    component: "NSelect",
    label: "类型",
    giProps: {
      //span: 24,
    },
    componentProps: {
      placeholder: "请选择类型",
      options: [
        {
          label: "舒适性",
          value: 1,
        },
        {
          label: "经济性",
          value: 2,
        },
      ],
      onUpdateValue: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: "makeDate",
    component: "NDatePicker",
    label: "预约时间",
    giProps: {
      //span: 24,
    },
    defaultValue: null,
    componentProps: {
      type: "datetime",
      clearable: true,
      valueFormat: "yyyy-MM-dd HH:mm:ss",
      onUpdateValue: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: "makeTime",
    component: "NTimePicker",
    label: "停留时间",
    giProps: {
      //span: 24,
    },
    componentProps: {
      clearable: true,
      onUpdateValue: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: "makeProject",
    component: "NCheckbox",
    label: "预约项目",
    giProps: {
      //span: 24,
    },
    componentProps: {
      placeholder: "请选择预约项目",
      options: [
        {
          label: "种牙",
          value: 1,
        },
        {
          label: "补牙",
          value: 2,
        },
        {
          label: "根管",
          value: 3,
        },
      ],
      onUpdateChecked: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: "makeSource",
    component: "NRadioGroup",
    label: "来源",
    giProps: {
      //span: 24,
    },
    componentProps: {
      options: [
        {
          label: "网上",
          value: 1,
        },
        {
          label: "门店",
          value: 2,
        },
      ],
      onUpdateChecked: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: "status",
    label: "状态",
    giProps: {
      //span: 24,
    },
    //插槽
    slot: "statusSlot",
  },
];
const [register, {}] = useForm({
  gridProps: { cols: 1 },
  collapsedRows: 3,
  labelWidth: 120,
  layout: "horizontal",
  submitButtonText: "提交预约",
  // submitButtonOptions: { ghost:true },
  schemas,
});
function handleSubmit(values: Recordable) {
  console.log(values);
  message.success(JSON.stringify(values));
}
function handleReset(values: Recordable) {
  console.log(values);
  // console.log(date);
}
</script>
<style lang="less" scoped>
.BasicForm {
  width: 550px;
  margin: 0 auto;
  overflow: hidden;
  padding-top: 20px;
}
</style>
