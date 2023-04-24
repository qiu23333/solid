import { App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// @ts-ignore
import { loadingBar } from "/@/components/Dialog";
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/login.vue')
  },

  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home.vue'),
    children: [

      {
        path: '/customer',
        name: 'customer',
        component: () => import('../modules/customer/index.vue')
      },
      {
        path: '/station',
        name: 'station',
        component: () => import('../modules/station/index.vue'),
      },
      {
        path: '/equipment',
        name: 'equipment',
        component: () => import('../modules/equipment/index.vue'),
      },
      {
        path: '/useform',
        name: 'useform',
        component: () => import('../views/useForm.vue')
      }
    ]
  },

]
const router = createRouter({
  history: createWebHashHistory(), // 路由模式
  routes
})
router.beforeEach((to, from) => {
  // ...
  loadingBar.start()
  // 返回 false 以取消导航
  // return false
})
router.afterEach((to, from) => {
  // ...
  loadingBar.finish()
  // 返回 false 以取消导航
  // return false
})
export { router }

// 配置路由器
export function setupRouter(app: App<Element>) {
  app.use(router);
}