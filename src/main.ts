import { createApp } from 'vue'
import './design/style.css'
import './design/index.css'
import App from './App.vue'
import { setupStore } from './store'
import { setupRouterGuard } from './router/guard'
import { router, setupRouter } from './router'
const app = createApp(App)
// 配置store
setupStore(app)
// 配置路由
setupRouter(app)
// 配置路由守卫
setupRouterGuard(router)
// 挂载app
app.mount('#app')
