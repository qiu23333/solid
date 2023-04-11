import { defineStore } from "pinia";
import { getData } from "../../../../api";
export const equipmentStore = defineStore({
    id: 'equipment',
    state: () => {
        let total = ''
        let page = ref(1)
        let pageSize = ref(10)
        let data = []
        return {
            data,
            total,
            page,
            pageSize
        }
    },
    actions: {
        async getData(p: number, ps?: number) {
            // page 为0 修改每页条数。转到第一页，并修改size
            if (p == 0) {
                // api请求数据
                let res = await getData(1, ps)
                // 刷新本地数据
                console.log(res.data)
                // const {current:page, records:data, size, total} = res.data
                // this.data = {page, data, size, total}
                this.data = res.data.records
                this.total = res.data.total
                this.page = 1
            } else {
                // api请求数据
                let res = await getData(p,this.pageSize)
                // 刷新本地数据
                console.log(res.data)
                // const {current:page, records:data, size, total} = res.data
                // this.data = {page, data, size, total}
                this.data = res.data.records
                this.total = res.data.total
                // 数据更新，需要重载页面
                // this.router.go(0)
            }

        },
        search(p: any) {
            // api发起请求，把输入的参数传到后端，拿到返回的数据
            
            console.log(p)
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
