import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useStudyStore } from './stores/study'

import 'vant/lib/index.css'
import './styles/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// 先完成数据初始化（读取本地 / 写入种子），再挂载应用
const store = useStudyStore(pinia)
store.init().finally(() => {
  app.mount('#app')
})
