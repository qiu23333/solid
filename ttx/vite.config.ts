
import { resolve } from 'path';

function pathResolve(dir: string) {
	return resolve(process.cwd(), '.', dir);
}

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
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
			resolvers: [NaiveUiResolver()]
		})],
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
		dedupe: ['vue'],
	},
	server: { //主要是加上这段代码
		host: true,
		port: 8001,
		// proxy: createProxy(VITE_PROXY),
		proxy: {
			'/api': {
				target: 'http://10.40.38.73:8801/api',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			}

		},
	}
})
