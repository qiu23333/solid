import vue from '@vitejs/plugin-vue'
// 自动导入vue中hook reactive ref等
import AutoImport from "unplugin-auto-import/vite"
//自动导入ui-组件 比如说ant-design-vue  element-plus等
import Components from 'unplugin-vue-components/vite'
// 语法糖自定义组件名称
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
// naive ui自动导入
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

import type { UserConfig, ConfigEnv } from 'vite';
import { loadEnv } from 'vite';
import { resolve } from 'path';
import { wrapperEnv } from './build/utils';
import { createVitePlugins } from './build/vite/plugin';
import { OUTPUT_DIR } from './build/constant';
import { createProxy } from './build/vite/proxy';
import pkg from './package.json';
import { format } from 'date-fns';
const { dependencies, devDependencies, name, version } = pkg;

const __APP_INFO__ = {
	pkg: { dependencies, devDependencies, name, version },
	lastBuildTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
};

function pathResolve(dir: string) {
	return resolve(process.cwd(), '.', dir);
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
	const root = process.cwd();
	const env = loadEnv(mode, root);
	const viteEnv = wrapperEnv(env);
	const { VITE_PUBLIC_PATH, VITE_PORT, VITE_GLOB_PROD_MOCK, VITE_PROXY } = viteEnv;
	const prodMock = VITE_GLOB_PROD_MOCK;
	const isBuild = command === 'build';
	return {
		base: VITE_PUBLIC_PATH,
		esbuild: {},
		// plugins: [
		// 	vue(),

		// ],
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
		plugins: [
			createVitePlugins(viteEnv, isBuild, prodMock),
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
		],
		define: {
			__APP_INFO__: JSON.stringify(__APP_INFO__),
		},
		css: {
			preprocessorOptions: {
				less: {
					modifyVars: {},
					javascriptEnabled: true,
					additionalData: `@import "src/styles/var.less";`,
				},
			},
		},
		server: {
			host: true,
			port: VITE_PORT,
			// proxy: createProxy(VITE_PROXY),
			proxy: {
			    '/api': {
			        target: 'http://172.16.10.135:8801/api',
			        changeOrigin: true,
			        rewrite: (path) => path.replace(/^\/api/, '')
			    }
			}
		},
		optimizeDeps: {
			include: [],
			exclude: ['vue-demi'],
		},
		build: {
			target: 'es2015',
			cssTarget: 'chrome80',
			outDir: OUTPUT_DIR,
			// terserOptions: {
			//   compress: {
			//     keep_infinity: true,
			//     drop_console: VITE_DROP_CONSOLE,
			//   },
			// },
			reportCompressedSize: false,
			chunkSizeWarningLimit: 2000,
		},
	};
};