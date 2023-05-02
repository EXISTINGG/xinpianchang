import { createApp } from 'vue'
import './style.css'
import 'vant/es/dialog/style';
import './utils/rem'
import router from './router/index'
import App from './App.vue'
// 图片懒加载
import { Lazyload} from 'vant';
// 导入pinia
import {createPinia} from 'pinia'
// 创建pinia实例
const pinia = createPinia()

createApp(App).use(router).use(pinia).use(Lazyload, {lazyComponent: true}).mount('#app')
