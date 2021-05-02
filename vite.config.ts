import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const path = require('path');


// https://vitejs.dev/config/

export default defineConfig({
  alias: {
    // 键必须以斜线开始和结束
    '/@/': path.resolve(__dirname, './src')
    // '/@components/': path.resolve(__dirname, './src/components')
  },


  plugins: [vue()]
})
