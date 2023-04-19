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

import { message } from "/@/components/Dialog";
import { FormItemRule, FormRules } from "naive-ui";

export const equipmentStore = defineStore({
    id: 'equipment',
    state: () => {
        let total = ''
        let page = 1
        let all = 1
        let pageSize = 10
        let data = []
        let loading = false
        let checkedRowKeysRef = ""
        let showModal = false
        let searchInfo = {
            baseName: "",
            type: null,
            itemNo: "",
        }
        let changeInfo = {
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
            parentId: '',
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
            //场站id
            orgId: '',
            // 
            id: ''
        }
        let parentNameOptions = [
            {}
        ]
        let dictItemProtocolOptions = [
            {}
        ]
        let dictItemModelOptions = [
            {}
        ]
        let dictItemBrandOptions = [
            {}
        ]
        let baseNameOptions = [
            {}
        ]
        const rules: FormRules = {
            type: [{
                required: true,
                message: '请选择设备类型',
                validator (value: any) {
                    if (!value&&value!=='') {
                      return new Error('请选择设备类型')
                    } 
                    return true
                  },
                trigger: ['input', 'blur']
            }],
            subName: [{
                required: true,
                message: '清输入设备名称',
                validator (value: any) {
                    if (value=='' || value==null) {
                      return new Error('清输入设备名称')
                    } 
                    return true
                  },
                trigger: ['input', 'blur']
            }],
            host: [{
                required: true,
                message: '请输入通讯地址',
                validator (value: any) {
                    if (value=='' || value==null) {
                      return new Error('请输入通讯地址')
                    } 
                    return true
                  },
                trigger: ['input', 'blur']
            }],
            port: [{
                required: true,
                message: '请输入端口号',
                validator (value: any) {
                    if (value=='' || value==null) {
                      return new Error('请输入端口号')
                    } 
                    return true
                  },
                trigger: ['input', 'blur']
            }],
            freq: [{
                required: true,
                message: '请输入采集步长',
                validator (value: any) {
                    if (value=='' || value==null) {
                      return new Error('请输入采集步长')
                    } 
                    return true
                  },
                trigger: ['input', 'blur']
            }],
            protocol: [{
                required: true,
                message: '请选择协议类型',
                validator (value: any) {
                    if (value=='' || value==null) {
                      return new Error('请选择协议类型')
                    } 
                    return true
                  },
                trigger: ['input', 'blur']
            }],
            model: [{
                required: true,
                message: '请选择设备型号',
                validator (value: any) {
                    if (value=='' || value==null) {
                      return new Error('请选择设备型号')
                    } 
                    return true
                  },
                trigger: ['input', 'blur']
            }],
            brand: [{
                required: true,
                message: '请选择设备厂商',
                validator (value: any) {
                    if (value=='' || value==null) {
                      return new Error('请选择设备厂商')
                    } 
                    return true
                  },
                trigger: ['input', 'blur']
            }],
            baseName: [{
                required: true,
                message: '请选择设备所属场站',
                validator (value: any) {
                    if (value=='' || value==null) {
                      return new Error('请选择设备所属场站')
                    } 
                    return true
                  },
                trigger: ['input', 'blur']
            }],
            slave: [{
                required: true,
                message: '请输入从站号',
                validator (value: any) {
                    if (value=='' || value==null ) {
                      return new Error('请输入从站号')
                    } 
                    return true
                  },
                trigger: ['input', 'blur']
            }]
        }
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
            changeInfo,
            rules,
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
            if (!this.useSearch) {
                // page 为0 修改每页条数。转到第一页，并修改size
                if (p == 0) {
                    this.loading = true
                    let res = await getData(1, ps)
                    this.data = res.data.records
                    this.total = res.data.pages
                    this.all = res.data.total
                    this.page = 1
                    this.checkedRowKeysRef = ""
                    this.loading = false
                } else {
                    this.loading = true
                    let res = await getData(p, this.pageSize)
                    this.data = res.data.records
                    this.total = res.data.pages
                    this.all = res.data.total
                    this.checkedRowKeysRef = ""
                    this.loading = false
                }
            } else {
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
                    let res = await getData(p, this.pageSize, this.searchInfo)
                    this.data = res.data.records
                    this.total = res.data.pages
                    this.all = res.data.total
                    this.checkedRowKeysRef = ""
                    this.loading = false
                }
            }

        },
        async search(p: any) {
            await this.getData(1, this.pageSize, p)
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
            this.changeInfo = info.data
        },
        async add() {
            await this.resetInfo()
            // 为新建的设备获取编号
            let res = await getDeviceNo()
            this.changeInfo.itemNo = res.data
            await this.getAddData()

        },
        resetInfo() {
            this.changeInfo = {
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
            parentId: '',
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
            //场站id
            orgId: '',
            // 
            id: ''
            }
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
