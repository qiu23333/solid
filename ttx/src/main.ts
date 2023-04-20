import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from './store'
import { setupRouter } from './router'
import naive from 'naive-ui'
import './design/style.css'

const app = createApp(App)
// 函数式装载 store
setupStore(app)
// 装载router
setupRouter(app)

app.use(naive)

app.mount('#app')
