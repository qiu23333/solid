import { defineStore } from "pinia";
import {
    getData
    // @ts-ignore
} from "/@/api";
export const equipmentStore = defineStore({
    id: 'equipment',
    state: () => ({
        total: '',
        page: 1,
        all: 1,
        pageSize: 10,
        data: [],
        isadd: false,
        loading: false,
        checkedRowKeysRef: "",
        searchInfo: {
            baseName: "",
            type: null,
            itemNo: "",
        },
    }),
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
    }
})
