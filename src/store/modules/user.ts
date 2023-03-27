import { defineStore } from "pinia";

import login from "@/api/sys";

export const useUserStore = defineStore({
  id: "user",
  state: () => {
    return {
      userInfo: {
        id: "666",
        pwd: "114514",
        isLoad: false,
      },
    };
  },
  actions: {
    Login() {
      if (login(this.userInfo)) {
        // 将返回的账户信息拷贝到store嘛？

        // 改变登录状态
        this.userInfo.isLoad = true;
      }
    },
  },
});
