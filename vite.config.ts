import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  css: {
    // 使用 less
    preprocessorOptions: {
    scss: {
      additionalData: '@import "@/assets/styles/global.scss";'
    }
    },
  },
  resolve: {
    //配置文件扩展名
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json","scss"],
    // Vite路径别名配置
    alias: {
      "@": path.resolve(__dirname, './src'),
  }
  },
  // server: {
    // proxy: {
  //     '/api': {
  //       target: 'https://h5.xinpianchang.com',
  //       changeOrigin: true,
  //       rewrite: path => path.replace(/^\/api/, '')
  //     }
  //   }
  // }
})
