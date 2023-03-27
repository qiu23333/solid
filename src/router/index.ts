import { App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [{
  path: '/',
  name: 'Home',
  component: () => import('../components/HelloWorld.vue')
}]

const router = createRouter({
  history: createWebHashHistory(), // 路由模式
  routes
})

export  { router }
// reset router
// export function resetRouter() {
//     router.getRoutes().forEach((route) => {
//       const { name } = route;
//       if (name && !WHITE_NAME_LIST.includes(name as string)) {
//         router.hasRoute(name) && router.removeRoute(name);
//       }
//     });
//   }
  
  // config router
  // 配置路由器
  export function setupRouter(app: App<Element>) {
    app.use(router);
  }