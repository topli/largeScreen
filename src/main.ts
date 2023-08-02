import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import directives from '@/libs/directives'

import { Table, Tooltip, Tree, StyleProvider } from 'ant-design-vue';

const app = createApp(App)
// 单组件引入
app.use(StyleProvider)
app.use(Table)
app.use(Tooltip)
app.use(Tree)

app.use(router)
// 初始化指令
directives(app)

app.mount('#app')
