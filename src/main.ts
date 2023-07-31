import { createApp } from 'vue'
import App from './App.vue'
import directives from '@/libs/directives'

import { Table, Tooltip, Tree } from 'ant-design-vue';

const app = createApp(App)
// 单组件引入
app.use(Table)
app.use(Tooltip)
app.use(Tree)
// 初始化指令
directives(app)

app.mount('#app')
