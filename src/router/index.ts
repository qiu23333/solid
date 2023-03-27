import { App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '../store/modules/user';

const routes: RouteRecordRaw[] = [{
  path: '/',
  name: 'Home',
  // component: () => import('../components/HelloWorld.vue')
  component: () => import('@/views/login/HelloWorld.vue')
},
{
  path: '/station',
  name: 'station',
  component: () => import('../modules/station/station.vue'),
  beforeEnter: (to: any, from: any, next: any) => {
    const store = useUserStore();
    console.log(from.path === '/')
    if(from.path==='/'){
      store.Login()
      if (store.userInfo.isLoad) {
        alert("登录成功捏！");
        next();
      } else alert("崽种！账号密码不对捏！！！");
      return false;
    }
    else if(store.userInfo.isLoad) next()
    else router.push('/')
  },
}
]

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