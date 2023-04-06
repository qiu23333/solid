import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const equipmentStore=defineStore({
    id:'equipment',
    state:()=>{
        let data = Array.from({ length: 46 }).map((_, index) => ({
            key: index,
            name: `Edward King ${index}`,
            id: index,
            address: `London, Park Lane no. ${index}`,
            type: "ncu",
            father: "114514",
          }))
          const router = useRouter()
        return {
            data,router
        }
    },
    actions:{
        getData(){
            // api请求数据
            
            // 刷新本地数据

            // 数据更新，需要重载页面
            this.router.go(0)
        },
        search(p){
            // api发起请求，把输入的参数传到后端，拿到返回的数据
            console.log(p)
            // 刷新本地数据
            // this.data = []
            // 数据更新，需要重载页面
            // this.router.go(0)
        },
        addData(){
            console.log("稍作添加")
        },
        delData(){
            console.log("略作删除")
        },
        change(){

        }
    }
})
