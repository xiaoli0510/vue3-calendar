import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import autoprefixer from 'autoprefixer';
import postCssPxToRem from 'postcss-pxtorem';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    autoprefixer({
      overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8'],
    }),
    postCssPxToRem({
      // 自适应，px>rem转换
      rootValue: 75, // 75表示750设计稿，37.5表示375设计稿
      propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
      selectorBlackList: ['norem'], // 过滤掉norem-开头的class，不进行rem转换
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        // 引入 mixin.scss 这样就可以在全局中使用 mixin.scss中预定义的变量了
        // 给导入的路径最后加上 ; 
        additionalData: '@import "@/assets/variable.scss";'
      }
    }
  }
})
