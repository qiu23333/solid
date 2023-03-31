import { App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path:'/',
    name:'Login',
    component:()=>import('../views/login.vue')
  },
  
  {
  path: '/home',
  name: 'Home',
  component: () => import('../views/home.vue'),
  children:[

    {
      path:'/customer',
      name:'customer',
      component:()=>import('../modules/customer/index.vue')
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
      }
  ]
},

]
const router = createRouter({
  history: createWebHashHistory(), // 路由模式
  routes
})

export  { router }

  // 配置路由器
  export function setupRouter(app: App<Element>) {
    app.use(router);
  }