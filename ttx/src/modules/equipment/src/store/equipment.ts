import { defineStore } from "pinia";
import {
    getData,
    removeItem,
    getDeviceNo,
    selectDeviceParent,
    selectDeviceProtocol,
    selectDeviceModel,
    selectDeviceBrand,
    selectDeviceBaseName,
    getItem,
    updateItem,
    addItem,
    testConnect
} from "/@/api";
// import  enums  from "/@/locales/enums";
import { message, notification } from "/@/components/Dialog";
import { number } from "vue-types";
import { FormRules } from "naive-ui";

export const equipmentStore = defineStore({
    id: 'equipment',
    state: () => {
        let total = ''
        let page = ref(1)
        let all = ref(1)
        let pageSize = ref(10)
        let data = []
        let loading = ref(false)
        let checkedRowKeysRef = ""
        let showModal = ref(false)
        let showEdit = ref(false)
        let searchInfo = reactive({
            baseName: "",
            type: null,
            itemNo: "",
        })
        let changeInfo = reactive({
            // tcu/ncu
            type: null,

            // 设备编号
            itemNo: '',

            // 设备名称
            subName: '',

            // 端口号
            port: '',

            // 通讯地址
            host: '',

            // 采集步长
            freq: '',

            // 父级设备
            parentName: '',

            // 协议类型
            protocol: '',

            // 设备型号
            model: '',

            // 设备厂商
            brand: '',

            // 创建时间
            createTime: null,

            // 所属场站
            baseName: '',

            // 从站号
            slave: '',

            //不知名参数
            orgId: '',

            // 
            id: ''
        })
        let parentNameOptions = reactive([
            {}
        ])
        let dictItemProtocolOptions = reactive([
            {}
        ])
        let dictItemModelOptions = reactive([
            {}
        ])
        let dictItemBrandOptions = reactive([
            {}
        ])
        let baseNameOptions = reactive([
            {}
        ])

        return {
            data,
            total,
            page,
            pageSize,
            loading,
            searchInfo,
            all,
            checkedRowKeysRef,
            showModal,
            showEdit,
            changeInfo,
            parentNameOptions,
            dictItemProtocolOptions,
            baseNameOptions,
            dictItemModelOptions,
            dictItemBrandOptions,
        }
    },
    getters: {
        useSearch() {
            if (this.searchInfo.baseName == "" && this.searchInfo.type == null && this.searchInfo.itemNo == "") {
                return false
            } else {
                return true
            }
        }
    },
    actions: {
        async getData(p: number, ps?: number) {
            // console.log(this.useSearch)
            if (!this.useSearch) {
                // console.log("++++++++++")
                // page 为0 修改每页条数。转到第一页，并修改size
                if (p == 0) {
                    // loading
                    this.loading = true
                    // api请求数据
                    let res = await getData(1, ps)
                    // 刷新本地数据
                    this.data = res.data.records
                    this.total = res.data.pages
                    this.all = res.data.total
                    this.page = 1
                    this.checkedRowKeysRef = ""
                    this.loading = false
                } else {
                    this.loading = true
                    // api请求数据
                    let res = await getData(p, this.pageSize)
                    // 刷新本地数据
                    this.data = res.data.records
                    this.total = res.data.pages
                    this.all = res.data.total
                    this.checkedRowKeysRef = ""
                    this.loading = false
                    // 数据更新，需要重载页面
                    // this.router.go(0)
                }
            } else {
                // console.log("-------------")
                // page 为0 修改每页条数。转到第一页，并修改size
                if (p == 0) {
                    // loading
                    this.loading = true
                    // api请求数据
                    let res = await getData(1, ps, this.searchInfo)
                    // 刷新本地数据
                    this.data = res.data.records
                    this.total = res.data.pages
                    this.all = res.data.total
                    this.page = 1
                    this.checkedRowKeysRef = ""
                    this.loading = false
                } else {
                    this.loading = true
                    // api请求数据
                    let res = await getData(p, this.pageSize, this.searchInfo)
                    // 刷新本地数据
                    this.data = res.data.records
                    this.total = res.data.pages
                    this.all = res.data.total
                    this.checkedRowKeysRef = ""
                    this.loading = false
                    // 数据更新，需要重载页面
                    // this.router.go(0)
                }
            }

        },
        async search(p: any) {
            // 参数整理
            const info = { ...p }
            // 发送请求
            await this.getData(1, this.pageSize, info)
            // console.log(info)
            // 刷新本地数据
            // this.data = []
            // 数据更新，需要重载页面
            // this.router.go(0)
        },
        async getAddData() {
            // 获取父级设备列表
            let res1 = await selectDeviceParent()
            this.parentNameOptions = res1.data.map((i: { subName: any; id: any; }) => {
                return {
                    label: i.subName,
                    value: i.id
                }
            })
            // 获取协议类型
            let res2 = await selectDeviceProtocol()
            this.dictItemProtocolOptions = res2.data.map((i: { dictItemName: any; dictItemCode: any; }) => {
                return {
                    label: i.dictItemName,
                    value: i.dictItemCode
                }
            })
            // 获取设备型号
            let res3 = await selectDeviceModel()
            this.dictItemModelOptions = res3.data.map((i: { dictItemName: any; dictItemCode: any; }) => {
                return {
                    label: i.dictItemName,
                    value: i.dictItemCode
                }
            })
            // 获取设备厂商
            let res4 = await selectDeviceBrand()
            this.dictItemBrandOptions = res4.data.map((i: { dictItemName: any; dictItemCode: any; }) => {
                return {
                    label: i.dictItemName,
                    value: i.dictItemCode
                }
            })
            // 获取所属场站
            let res5 = await selectDeviceBaseName()
            this.baseNameOptions = res5.data.map((i: { baseName: any; id: any; }) => {
                return {
                    label: i.baseName,
                    value: i.id
                }
            })
        },
        async delData() {
            let res = await removeItem(this.checkedRowKeysRef)
            if (res.data === true) {
                this.getData(1, this.pageSize)
                console.log("##" + res.data)
                return true
            }
            else {
                return res.msg
            }
        },
        async editItem(id: any) {
            let info = await getItem(id)
            await this.resetInfo()
            await this.getAddData()
            this.changeInfo.type = info.data.type
            this.changeInfo.itemNo = info.data.itemNo
            this.changeInfo.subName = info.data.subName
            this.changeInfo.port = info.data.port
            this.changeInfo.host = info.data.host
            this.changeInfo.freq = info.data.freq
            this.changeInfo.parentName = info.data.parentName
            this.changeInfo.protocol = info.data.protocol
            this.changeInfo.model = info.data.model
            this.changeInfo.brand = info.data.brand
            this.changeInfo.createTime = info.data.createTime
            this.changeInfo.baseName = info.data.baseName
            this.changeInfo.slave = info.data.slave
            this.changeInfo.orgId = info.data.orgId
            this.changeInfo.id = info.data.id
        },
        async add() {
            await this.resetInfo()
            // 为新建的设备获取编号
            let res = await getDeviceNo()
            this.changeInfo.itemNo = res.data
            await this.getAddData()

        },
        resetInfo() {
            this.changeInfo.type = null
            this.changeInfo.itemNo = ''
            this.changeInfo.subName = ''
            this.changeInfo.port = ''
            this.changeInfo.host = ''
            this.changeInfo.freq = ''
            this.changeInfo.parentName = ''
            this.changeInfo.protocol = ''
            this.changeInfo.model = ''
            this.changeInfo.brand = ''
            this.changeInfo.createTime = null
            this.changeInfo.baseName = ''
            this.changeInfo.slave = ''
            this.changeInfo.orgId = ''
            this.changeInfo.id = ''
        },
        async updateItem() {
            const info = {
                brand: this.changeInfo.brand,
                createTime: this.changeInfo.createTime,
                freq: this.changeInfo.freq,
                host: this.changeInfo.host,
                id: this.changeInfo.id,
                itemNo: this.changeInfo.itemNo,
                model: this.changeInfo.model,
                orgId: this.changeInfo.orgId,
                parentId: this.changeInfo.parentId,
                port: this.changeInfo.port,
                protocol: this.changeInfo.protocol,
                slave: this.changeInfo.slave,
                subName: this.changeInfo.subName,
                type: this.changeInfo.type
            }
            let isOK = await updateItem(info)
            if (isOK.data == 1) {
                message.success("保存成功！")
                return true
            } else {
                message.error('保存失败！')
                return false
            }
        },
        async addItem() {
            const info = {
                brand: this.changeInfo.brand,
                createTime: this.changeInfo.createTime,
                freq: this.changeInfo.freq,
                host: this.changeInfo.host,
                id: this.changeInfo.id,
                itemNo: this.changeInfo.itemNo,
                model: this.changeInfo.model,
                orgId: this.changeInfo.orgId,
                parentId: this.changeInfo.parentId,
                port: this.changeInfo.port,
                protocol: this.changeInfo.protocol,
                slave: this.changeInfo.slave,
                subName: this.changeInfo.subName,
                type: this.changeInfo.type
            }
            let isOK = await addItem(info)
            if (isOK.data == 1) {
                message.success("添加成功！")
                return true
            } else {
                message.error('添加失败！')
                return false
            }
        },
        async test() {
            const info = {
                host: this.changeInfo.host,
                port: this.changeInfo.port,
            }
            let isOK = await testConnect(info)
            if (isOK.data == true) {
                message.success("链接成功！")
            } else {
                message.error("链接失败！")
            }
        }
    }
})
