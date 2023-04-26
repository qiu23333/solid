<template>
  <BasicForm @register="register" @submit="handleSubmit" />
</template>
<script setup lang="ts">
// @ts-ignore
import { BasicForm, FormSchema, useForm } from "/@/components/Form/index";
import { equipmentStore } from "../../../store/equipment";
import { storeToRefs } from "pinia";
const equipment = equipmentStore();
const props = defineProps(["itemInfo", "baseInfo"]);
const itemInfo = props.itemInfo;
let { isadd } = storeToRefs(equipment);
let {
  types = null,
  parents = null,
  Protocols = null,
  baseNames = null,
  Brands = null,
  Models = null,
  itemNo = null,
} = { ...props.baseInfo };
const schemas: FormSchema[] = [
  {
    field: "type",
    component: "NSelect",
    label: "设备类型",
    defaultValue: equipment.isadd ? null : itemInfo.type,
    giProps: {
      //span: 24,
    },
    componentProps: {
      clearable: true,
      options: types,
      onUpdateValue: (e: any) => {
        console.log(e);
      },
    },
    rules: [{ required: true, message: "请选择设备类型", trigger: ["blur"] }],
  },
  {
    field: "itemNo",
    component: "NInput",
    label: "设备编号",
    defaultValue: equipment.isadd ? itemNo : itemInfo.itemNo,
    giProps: {
      // span: 1,
    },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: "subName",
    component: "NInput",
    label: "设备名称",
    defaultValue: isadd.value ? null : itemInfo.subName,
    componentProps: {
      onInput: (e: any) => {
        console.log(e);
      },
    },
    rules: [{ required: true, message: "请输入设备名称", trigger: ["blur"] }],
  },
  {
    field: "host",
    component: "NInput",
    label: "通讯地址",
    defaultValue: isadd.value ? null : itemInfo.host,
    componentProps: {
      clearable: true,
    },
    rules: [{ required: true, message: "请输入通讯地址", trigger: ["blur"] }],
  },
  {
    field: "port",
    component: "NInput",
    label: "端口号",
    defaultValue: isadd.value ? null : itemInfo.host,
    componentProps: {
      clearable: true,
    },
    rules: [{ required: true, message: "请输入端口号", trigger: ["blur"] }],
  },
  {
    field: "freq",
    component: "NInput",
    label: "采集步长",
    defaultValue: isadd.value ? null : itemInfo.freq.toString(),
    componentProps: {
      clearable: true,
    },
    rules: [{ required: true, message: "请输入采集步长", trigger: ["blur"] }],
  },
  {
    field: "parentId",
    component: "NSelect",
    label: "父级设备",
    defaultValue: isadd.value ? null : itemInfo.parentId,
    componentProps: {
      clearable: true,
      options: parents,
    },
  },
  {
    field: "protocol",
    component: "NSelect",
    label: "协议类型",
    defaultValue: isadd.value ? null : itemInfo.protocol,
    componentProps: {
      clearable: true,
      options: Protocols,
    },
    rules: [{ required: true, message: "请选择协议类型", trigger: ["blur"] }],
  },
  {
    field: "model",
    component: "NSelect",
    label: "设备型号",
    defaultValue: isadd.value ? null : itemInfo.model,
    componentProps: {
      clearable: true,
      options: Models,
    },
    rules: [{ required: true, message: "请选择设备型号", trigger: ["blur"] }],
  },
  {
    field: "brand",
    component: "NSelect",
    label: "协议厂商",
    defaultValue: isadd.value ? null : itemInfo.brand,
    componentProps: {
      clearable: true,
      options: Brands,
    },
    rules: [{ required: true, message: "请选择协议厂商", trigger: ["blur"] }],
  },
  {
    field: "createTime",
    component: "NDatePicker",
    label: "创建时间",
    giProps: {
      //span: 24,
    },
    defaultValue: isadd.value ? undefined : itemInfo.createTime,
    componentProps: {
      type: "datetime",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
      clearable: true,
      // size: "large",
      onUpdateValue: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: "orgId",
    component: "NSelect",
    label: "设备所属场站",
    defaultValue: isadd.value ? null : itemInfo.orgId.toString(),
    componentProps: {
      clearable: true,
      options: baseNames,
    },
    rules: [
      { required: true, message: "请选择设备所属场站", trigger: ["blur"] },
    ],
  },
  {
    field: "slave",
    component: "NInput",
    label: "从站号",
    defaultValue: isadd.value ? null : itemInfo.slave.toString(),
    componentProps: {
      clearable: true,
    },
    rules: [{ required: true, message: "请输入从站号", trigger: ["blur"] }],
  },
];
const [register, { submit, getFieldsValue }] = useForm({
  gridProps: { cols: 2, yGap: 5 },
  labelWidth: 130,
  layout: "horizontal",
  showActionButtonGroup: false,
  requireMarkPlacement: "left",
  class: "mt-10 w-auto m-auto mr-14",
  schemas,
});
function handleSubmit(values: Recordable) {
  console.log(values);
  // message.success(JSON.stringify(values));
  // if (values != null) return true;
}
defineExpose({ submit, getFieldsValue });
</script>
<style scoped></style>
