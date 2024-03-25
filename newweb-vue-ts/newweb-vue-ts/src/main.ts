import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import router from './router'


// const app = createApp(App)
// app.config.globalProperties.$iflogin = 'true'
// app.use(ElementPlus).use(router).mount('#app')
createApp(App).use(ElementPlus).use(router).mount('#app')
