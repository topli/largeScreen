import type { RouteRecordRaw } from 'vue-router'

import ProjectOverview from '@/views/projectOverview/index.vue'
import ProjectBoard from '@/views/projectBoard/index.vue'
import DeptBoard from '@/views/deptBoard/index.vue'
import DeptDetail from '@/views/deptDetail/index.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/projectOverview'  },
  { path: '/projectOverview', component: ProjectOverview },
  { path: '/projectBoard', component: ProjectBoard },
  { path: '/deptBoard', component: DeptBoard },
  { path: '/deptDetail', component: DeptDetail }
]

export default routes