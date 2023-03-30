import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from "path";
import dotenv from 'dotenv'
// https://vitejs.dev/config/


export default defineConfig({ 
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }
      ]
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    })],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  server: { //主要是加上这段代码
    // host: '127.0.0.1',
    // port: 3000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8888',	//实际请求地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  }
})
