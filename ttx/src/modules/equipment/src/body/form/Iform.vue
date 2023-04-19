<template>
  <n-form
    class="relative font-sans"
    :bordered="false"
    size="medium"
    label-placement="left"
    label-width="110"
  >
    <div class="mt-4 ml-5 text-lg">编辑设备</div>
    <n-divider class="bg-gary-500" />
    <n-form-item label="">
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
    </n-form-item>

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
        v-if="props.isadd"
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
</template>

<script setup lang="ts">
import { message } from "/@/components/Dialog";
import {
  getDeviceNo,
  selectDeviceParent,
  selectDeviceProtocol,
  selectDeviceModel,
  selectDeviceBrand,
  selectDeviceBaseName,
  getItem,
  updateItem,
  addItem,
  testConnect,
} from "/@/api";
import { onMountedOrActivated } from "../../../../../hooks/core/onMountedOrActivated";
import { equipmentStore } from "../../store/equipment";
import { nextTick, reactive } from "vue";
const equipment = equipmentStore();
const props = defineProps(["isadd", "id"]);
const typeOptions = [
  {
    label: "tcu",
    value: "7",
  },
  {
    label: "ncu",
    value: "6",
  },
];
let changeInfo = reactive({
  // tcu/ncu
  type: null,
  // 设备编号
  itemNo: "",
  // 设备名称
  subName: "",
  // 端口号
  port: "",
  // 通讯地址
  host: "",
  // 采集步长
  freq: "",
  // 父级设备
  parentId: "",
  // 协议类型
  protocol: "",
  // 设备型号
  model: "",
  // 设备厂商
  brand: "",
  // 创建时间
  createTime: null,
  // 所属场站
  baseName: "",
  // 从站号
  slave: "",
  //场站id
  orgId: "",
  //
  id: "",
});
let parentNameOptions = reactive([{}]);
let dictItemProtocolOptions = reactive([{}]);
let dictItemModelOptions = reactive([{}]);
let dictItemBrandOptions = reactive([{}]);
let baseNameOptions = reactive([{}]);
async function handleTest() {
  const info = {
    host: changeInfo.host,
    port: changeInfo.port,
  };
  let isOK = await testConnect(info);
  if (isOK.data == true) {
    message.success("链接成功！");
  } else {
    message.error("链接失败！");
  }
}
async function handle() {
  if (props.isadd == true) {
    const info = {
      brand: changeInfo.brand,
      createTime: changeInfo.createTime,
      freq: changeInfo.freq,
      host: changeInfo.host,
      id: changeInfo.id,
      itemNo: changeInfo.itemNo,
      model: changeInfo.model,
      orgId: changeInfo.orgId,
      parentId: changeInfo.parentId,
      port: changeInfo.port,
      protocol: changeInfo.protocol,
      slave: changeInfo.slave,
      subName: changeInfo.subName,
      type: changeInfo.type,
    };
    let res = await addItem(info);
    if (res.data == 1) {
      message.success("添加成功！");
      equipment.showModal = false;
      equipment.getData(1, equipment.pageSize);
    } else {
      message.error("添加失败！");
    }
  } else {
    const info = {
      brand: changeInfo.brand,
      createTime: changeInfo.createTime,
      freq: changeInfo.freq,
      host: changeInfo.host,
      id: changeInfo.id,
      itemNo: changeInfo.itemNo,
      model: changeInfo.model,
      orgId: changeInfo.orgId,
      parentId: changeInfo.parentId,
      port: changeInfo.port,
      protocol: changeInfo.protocol,
      slave: changeInfo.slave,
      subName: changeInfo.subName,
      type: changeInfo.type,
    };
    let res = await updateItem(info);
    if (res.data == 1) {
      message.success("保存成功！");
      equipment.showModal = false;
      equipment.getData(1, equipment.pageSize);
    } else {
      message.error("保存失败！");
    }
  }
}
async function getInfo(props){
   // 获取父级设备列表
   let res1 = await selectDeviceParent();
  parentNameOptions = res1.data.map((i: { subName: any; id: any }) => {
    return {
      label: i.subName,
      value: i.id,
    };
  });
  // 获取协议类型
  let res2 = await selectDeviceProtocol();
  dictItemProtocolOptions = res2.data.map(
    (i: { dictItemName: any; dictItemCode: any }) => {
      return {
        label: i.dictItemName,
        value: i.dictItemCode,
      };
    }
  );
  // 获取设备型号
  let res3 = await selectDeviceModel();
  dictItemModelOptions = res3.data.map(
    (i: { dictItemName: any; dictItemCode: any }) => {
      return {
        label: i.dictItemName,
        value: i.dictItemCode,
      };
    }
  );
  // 获取设备厂商
  let res4 = await selectDeviceBrand();
  dictItemBrandOptions = res4.data.map(
    (i: { dictItemName: any; dictItemCode: any }) => {
      return {
        label: i.dictItemName,
        value: i.dictItemCode,
      };
    }
  );
  // 获取所属场站
  let res5 = await selectDeviceBaseName();
  baseNameOptions = res5.data.map((i: { baseName: any; id: any }) => {
    return {
      label: i.baseName,
      value: i.id,
    };
  });
  // 获取设备编号
  if (props.isadd == true) {
    // 为新建的设备获取编号
    let res = await getDeviceNo();
    changeInfo.itemNo = res.data;
  } else {
    // 初始化被编辑设备的信息
    let info = await getItem(props.id);
    changeInfo = info.data;
    console.log('超！')
  }
}
onMountedOrActivated(async () => {
 await getInfo(props)
 console.log(baseNameOptions)
});
</script>

<style lang="scss" scoped></style>
