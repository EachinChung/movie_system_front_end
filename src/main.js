import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale'
import '@/assets/less/global.less'
import setupElement from '@/services/setupElement'

locale.use(lang)

createApp(App)
  .use(store)
  .use(router)
  .use(setupElement)
  .mount('#app')
