import { createApp } from 'vue'
import App from './App.vue'
import directives from '@/libs/directives'

const app = createApp(App)
// 初始化指令
directives(app)

app.mount('#app')
