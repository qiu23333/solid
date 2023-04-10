import { defineStore } from "pinia";
import { getData } from "../../../../api";
export const equipmentStore = defineStore({
    id: 'equipment',
    state: () => {
        let data = []
        return {
            data
        }
    },
    actions: {
        async getData() {
            // api请求数据
            let res = await getData()
            // 刷新本地数据
            console.log(res.data)
            // const {current:page, records:data, size, total} = res.data
            // this.data = {page, data, size, total}
            this.data = res.data.records
            // 数据更新，需要重载页面
            // this.router.go(0)
        },
        search(p) {
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
