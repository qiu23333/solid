<template>
  <basicModal
    @register="modalRegister"
    ref="modalRef"
    class="basicModal"
    @on-ok="okModal"
  >
    <template #default>
      <BasicForm
        @register="register"
        @submit="handleSubmit"
      />
    </template>
    <template v-if="isadd" #action>
      <n-button
      @click="closeModal"
      >取消</n-button>
      <n-button
      
      >测试连接</n-button>
      <n-button
      @click="okModal"
      >保存</n-button>
    </template>
  </basicModal>
</template>

<script setup lang="ts">
// @ts-ignore
import { BasicForm, FormSchema, useForm } from "/@/components/Form/index";
// @ts-ignore
import { message } from "/@/components/Dialog";
import {
  getDeviceNo,
  selectDeviceBaseName,
  selectDeviceBrand,
  selectDeviceModel,
  selectDeviceParent,
  selectDeviceProtocol,
  //   @ts-ignore
} from "/@/api";
// @ts-ignore
import { useModal } from "/@/components/Modal";
import { equipmentStore } from "../../store/equipment";
import { storeToRefs } from "pinia";
// @ts-ignore
import { onMountedOrActivated } from "/@/hooks/core/onMountedOrActivated";
let parentNameOptions = reactive([{}]);
let dictItemProtocolOptions = reactive([{}]);
let dictItemModelOptions = reactive([{}]);
let dictItemBrandOptions = reactive([{}]);
let baseNameOptions = reactive([{}]);
const equipment = equipmentStore();
let { data, loading, showModal, changeInfo, isadd } = storeToRefs(equipment);
const props = defineProps(["title"]);
const schemas: FormSchema[] = [
  {
    field: "type",
    component: "NSelect",
    label: "设备类型",
    giProps: {
      //span: 24,
    },
    componentProps: {
      clearable: true,
      options: [
        {
          label: "TCU",
          value: '7',
        },
        {
          label: "NCU",
          value: '6',
        },
      ],
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
    // defaultValue: (await getDeviceNo()).data,
    giProps: {
      // span: 1,
    },
    componentProps: {
      disabled: true,
      value: "addNo",
    },
  },
  {
    field: "subName",
    component: "NInput",
    label: "设备名称",
    componentProps: {
      showButton: true,
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
    componentProps: {
      clearable: true,
    },
    rules: [{ required: true, message: "请输入通讯地址", trigger: ["blur"] }],
  },
  {
    field: "port",
    component: "NInput",
    label: "端口号",
    componentProps: {
      clearable: true,
    },
    rules: [{ required: true, message: "请输入端口号", trigger: ["blur"] }],
  },
  {
    field: "freq",
    component: "NInput",
    label: "采集步长",
    componentProps: {
      clearable: true,
    },
    rules: [{ required: true, message: "请输入采集步长", trigger: ["blur"] }],
  },
  {
    field: "parentId",
    component: "NSelect",
    label: "父级设备",
    componentProps: {
      clearable: true,
      options: [
        {
          label: "大跌1",
          value: 114,
        },
        {
          label: "大跌2",
          value: 514,
        },
      ],
    },
  },
  {
    field: "protocol",
    component: "NSelect",
    label: "协议类型",
    componentProps: {
      clearable: true,
      options: [
        {
          label: "mudbus",
          value: '0',
        },
      ],
    },
    rules: [{ required: true, message: "请选择协议类型", trigger: ["blur"] }],
  },
  {
    field: "model",
    component: "NSelect",
    label: "设备型号",
    componentProps: {
      clearable: true,
      options: [
        {
          label: "型号2",
          value: '1',
        },
      ],
    },
    rules: [{ required: true, message: "请选择设备型号", trigger: ["blur"] }],
  },
  {
    field: "brand",
    component: "NSelect",
    label: "协议厂商",
    componentProps: {
      clearable: true,
      options: [
        {
          label: "⭐⭐充电",
          value: '5',
        },
        {
          label: "天合光能",
          value: '6',
        },
      ],
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
    defaultValue: 1183135260000,
    componentProps: {
      type: "datetime",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
      clearable: true,
      size: "large",
      onUpdateValue: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: "baseName",
    component: "NSelect",
    label: "设备所属场站",
    componentProps: {
      clearable: true,
      options: [
        {
          label: "秋水共长天",
          value: '1',
        },
      ],
    },
    rules: [
      { required: true, message: "请选择设备所属场站", trigger: ["blur"] },
    ],
  },
  {
    field: "slave",
    component: "NInput",
    label: "从站号",
    componentProps: {
      clearable: true,
    },
    rules: [{ required: true, message: "请输入从站号", trigger: ["blur"] }],
  },
];
const [modalRegister, { openModal, closeModal, setSubLoading }] = useModal({
  closable: false,
  style: {
    width: "890px",
  },
  title: "热烈的🐎",
});
const [register, { submit }] = useForm({
  gridProps: { cols: 2, yGap: 5 },
  labelWidth: 130,
  layout: "horizontal",
  showActionButtonGroup: false,
  requireMarkPlacement: "left",
  class: "mt-10 w-auto m-auto mr-14",
  schemas,
});

async function okModal() {
  const formRes = await submit();
  //   const formRal = await handleFormValues();
    console.log(formRes)
  if (formRes == true) {
    closeModal();
    message.success("提交成功");
  } else {
    message.error("验证失败，请填写完整信息");
    setSubLoading(false);
  }
}
function handleSubmit(values: Recordable) {
  console.log(values);
  message.success(JSON.stringify(values));
  if(values!=null) return true
}


defineExpose({ openModal });
</script>

<style scoped></style>
