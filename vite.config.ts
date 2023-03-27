import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteMockServe } from "vite-plugin-mock";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    vue(),
    viteMockServe({
      mockPath: "./src/mock",
      localEnabled: true, // 开发
      prodEnabled: false, // 生产
      injectFile: path.resolve("src/main.ts"), // 解决读取不到mock.ts 问题注入文件
    }),
  ],
});
