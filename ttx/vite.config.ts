import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 自动导入vue中hook reactive ref等
import AutoImport from "unplugin-auto-import/vite"
//自动导入ui-组件 比如说ant-design-vue  element-plus等
import Components from 'unplugin-vue-components/vite'
// 语法糖自定义组件名称
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
// naive ui自动导入
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

function pathResolve(dir: string) {
	return resolve(process.cwd(), '.', dir);
}
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			//安装两行后你会发现在组件中不用再导入ref，reactive等
			imports: ['vue', 'vue-router', {
				'naive-ui': [
					'useDialog',
					'useMessage',
					'useNotification',
					'useLoadingBar'
				]
			}],
			//存放的位置
			dts: "src/auto-import.d.ts",

		}),
		Components({
			// 引入组件的,包括自定义组件
			// 存放的位置
			dts: "src/components.d.ts",
			// naive ui自动导入
			resolvers: [NaiveUiResolver()]
		}),
		VueSetupExtend(),
	],
	resolve: {
		alias: [
			{
				find: 'vue-i18n',
				replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
			},
			// /@/xxxx => src/xxxx
			{
				find: /\/@\//,
				replacement: pathResolve('src') + '/',
			},
			// /#/xxxx => types/xxxx
			{
				find: /\/#\//,
				replacement: pathResolve('types') + '/',
			},
			// /#/xxxx => types/xxxx
			{
				find: /\/domain\//,
				replacement: pathResolve('src/modules') + '/',
			},
		],
	},
	server: {
		proxy: {
			'/api': { // 配置需要代理的路径 --> 这里的意思是代理http://localhost:80/api/后的所有路由
				// target: 'http//10.40.38.73:8801', // 目标地址 --> 服务器地址
				target: 'http//http://172.16.10.135:8888', // 目标地址 --> 服务器地址
				changeOrigin: true, // 允许跨域
				// 重写路径 --> 作用与vue配置pathRewrite作用相同
				rewrite: (path) => path.replace(/^\/api/, "")
			}
		}
	}
})
