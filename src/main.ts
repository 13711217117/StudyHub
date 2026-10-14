import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'
import { useStudyStore } from './stores/study'

import 'vant/lib/index.css'
import './styles/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// 先恢复登录态；若已登录则按账号命名空间加载学习数据，再挂载应用
const auth = useAuthStore(pinia)
auth
  .init()
  .then(async () => {
    if (auth.isLoggedIn) await useStudyStore(pinia).init()
  })
  .finally(() => {
    app.mount('#app')
  })
