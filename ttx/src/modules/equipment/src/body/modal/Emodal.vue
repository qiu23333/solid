<template>
  <basicModal
    @register="modalRegister"
    ref="modalRef"
    class="basicModal"
    @on-ok="okModal"
  >
    <template #default>
      <Eform ref="form" :itemInfo="itemInfo" :baseInfo="baseInfo" />
    </template>
    <template  #action>
      <n-button @click="closeModal">取消</n-button>
      <n-button @click="tryConnect" type="info" ghost v-if="isadd">测试连接</n-button>
      <n-button @click="okModal" type="primary" ghost>保存</n-button>
    </template>
  </basicModal>
</template>

<script setup lang="ts">
// @ts-ignore
import { message } from "/@/components/Dialog"
// @ts-ignore
import { useModal } from "/@/components/Modal"
import { equipmentStore } from "../../store/equipment"
import { storeToRefs } from "pinia"
import dayjs from "dayjs"
import Eform from "./Eform/Eform.vue"
import {
  addItem,
  getDeviceNo,
  getItem,
  selectDeviceBaseName,
  selectDeviceBrand,
  selectDeviceModel,
  selectDeviceParent,
  selectDeviceProtocol,
  selectDeviceType,
  testConnect,
  updateItem,
  // @ts-ignore
} from "/@/api"
const form = ref<InstanceType<typeof Eform>>()
const equipment = equipmentStore()
let { isadd } = storeToRefs(equipment)
let itemInfo = {}
let baseInfo = {
  types: [{}],
  parents: [{}],
  Protocols: [{}],
  baseNames: [{}],
  Brands: [{}],
  Models: [{}],
  itemNo: null,
}
const [modalRegister, { openModal, closeModal, setSubLoading }] = useModal({
  closable: false,
  subBtuText: "保存",
  style: {
    width: "890px",
  },
  title: equipment.isadd ? "新建设备" : "编辑设备",
})
async function okModal() {
  const formRes = await form.value.submit();
  console.log(formRes);
  if (formRes == true) {
    let Res = await form.value?.getFieldsValue();
    if (Res.createTime) {
      Res.createTime = dayjs(Res.createTime).format("YYYY-MM-DD HH:mm:ss");
    }
    // 1682221493836
    // 转毫秒 ，valueOf()
    // 1548381600000
    let info = {
      id: 0,
      ...Res,
    };
    if (isadd.value == true) {
      console.log(info);
      let isOK = await addItem(info);
      if (isOK.data == 1) {
        message.success("添加成功！");
        equipment.getData(0, equipment.pageSize);
        setSubLoading(false);
        closeModal();
      } else {
        message.error("添加失败！");
        setSubLoading(false);
      }
    } else {
      // @ts-ignore
      info.id = itemInfo.id
      console.log(info)
      let isOK = await updateItem(info);
      if (isOK.data == 1) {
        message.success("保存成功！");
        setSubLoading(false);
        closeModal();
      } else {
        message.error("保存失败！");
        setSubLoading(false);
      }
    }
  } else {
    message.error("验证失败，请填写完整信息");
    setSubLoading(false);
  }
}
async function tryConnect() {
  const Res = await form.value?.getFieldsValue();
  console.log(Res);
  if (Res.port != undefined && Res.host != undefined) {
    let info = { port: Res.port, host: Res.host };
    let isOK = await testConnect(info);
    if (isOK.data == true) {
      message.success("链接成功！");
    } else {
      message.error("链接失败！");
    }
  } else {
    message.error("请正确填写端口号与通讯地址！");
  }
}
async function getData() {
  // 是否为新增设备获取编号
  if (equipment.isadd == true) {
    let res = await getDeviceNo();
    baseInfo.itemNo = res.data;
  }
  // 获取父级设备列表
  let res1 = await selectDeviceParent();
  baseInfo.parents = res1.data.map((i: { subName: any; id: any }) => {
    return {
      label: i.subName,
      value: i.id,
    };
  });
  // 获取协议类型
  let res2 = await selectDeviceProtocol();
  baseInfo.Protocols = res2.data.map(
    (i: { dictItemName: any; dictItemCode: any }) => {
      return {
        label: i.dictItemName,
        value: i.dictItemCode,
      };
    }
  );
  // 获取设备型号
  let res3 = await selectDeviceModel();
  baseInfo.Models = res3.data.map(
    (i: { dictItemName: any; dictItemCode: any }) => {
      return {
        label: i.dictItemName,
        value: i.dictItemCode,
      };
    }
  );
  // 获取设备厂商
  let res4 = await selectDeviceBrand();
  baseInfo.Brands = res4.data.map(
    (i: { dictItemName: any; dictItemCode: any }) => {
      return {
        label: i.dictItemName,
        value: i.dictItemCode,
      };
    }
  );
  // 获取所属场站
  let res5 = await selectDeviceBaseName();
  baseInfo.baseNames = res5.data.map((i: { baseName: any; id: any }) => {
    return {
      label: i.baseName,
      value: i.id.toString(),
    };
  });
  // 获取类型
  let res6 = await selectDeviceType();
  baseInfo.types = res6.data.map(
    (i: { dictItemName: string; dictItemCode: string }) => {
      return {
        // 字典项筛选
        label: i.dictItemCode === "6" ? "ncu" : "tcu",
        value: i.dictItemCode,
      };
    }
  );
}
async function getModal(id: any) {
  let res = await getItem(id);
  itemInfo = res.data;
  // @ts-ignore
  itemInfo.createTime = dayjs(itemInfo.createTime).valueOf();
  await getData();
  openModal();
}
defineExpose({ getModal, openModal, getData });
</script>
<style scoped></style>
