import { defineStore } from "pinia";
import { getData, removeItem, getDeviceNo, selectDeviceParent } from "../../../../api";
import { DataTableRowKey } from "naive-ui";

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
        let searchInfo = reactive({
            baseName: "",
            type: null,
            itemNo: "",
        })
        let changeInfo = reactive({
            type: null,
            itemNo: '',
            subName: '',
            port: '',
            host: "",
            freq: '',
            parentName: '',
            dictItemName: '',
            createTime: '',
            baseName: '',
            slave: ''
        })
        let parentNameOptions = reactive([
            {

            }
        ])
        let dictItemNameOptions = reactive([
            {

            }
        ])
        let baseNameOptions = reactive([
            {

            }
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
            changeInfo,
            parentNameOptions,
            dictItemNameOptions,
            baseNameOptions
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
        async addData() {
            let res = await getDeviceNo()
            this.changeInfo.itemNo = res.data
            let res1 = await selectDeviceParent()
            this.parentNameOptions = res.data
            console.log("稍作添加")
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
        change() {

        },

    }
})
