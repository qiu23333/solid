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
})
