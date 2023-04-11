import { defineStore } from "pinia";
import { getData } from "../../../../api";

export const equipmentStore = defineStore({
    id: 'equipment',
    state: () => {
        let total = ''
        let page = ref(1)
        let all = ref(1)
        let pageSize = ref(10)
        let data = []
        let loading = ref(false)
        let searchInfo = reactive({
            baseName: "",
            type: "",
            itemNo: "",
        })
        return {
            data,
            total,
            page,
            pageSize,
            loading,
            searchInfo,
            all
        }
    },
    getters: {
        useSearch() {
            if (this.searchInfo.baseName == "" && this.searchInfo.type == null && this.searchInfo.type == "" && this.searchInfo.itemNo == "") {
                return false
            } else {
                return true
            }
        }
    },
    actions: {
        async getData(p: number, ps?: number) {
            console.log(this.useSearch)
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
                    this.loading = false
                } else {
                    this.loading = true
                    // api请求数据
                    let res = await getData(p, this.pageSize)
                    // 刷新本地数据
                    this.data = res.data.records
                    this.total = res.data.pages
                    this.all = res.data.total
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
                    this.loading = false
                } else {
                    this.loading = true
                    // api请求数据
                    let res = await getData(p, this.pageSize, this.searchInfo)
                    // 刷新本地数据
                    this.data = res.data.records
                    this.total = res.data.pages
                    this.all = res.data.total
                    this.loading = false
                    // 数据更新，需要重载页面
                    // this.router.go(0)
                }
            }

        },
        async search(p: any) {
            // api发起请求，把输入的参数传到后端，拿到返回的数据

            const info = { ...p }
            await this.getData(1, this.pageSize, info)
            console.log(info)
            // 刷新本地数据
            // this.data = []
            // 数据更新，需要重载页面
            // this.router.go(0)
        },
        addData() {
            console.log("稍作添加")
        },
        delData() {
            console.log("略作删除")
        },
        change() {

        }
    }
})
