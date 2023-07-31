import type { RouteRecordRaw } from 'vue-router'
const ProjectOverview = import('@/views/projectOverview/index.vue')
const ProjectBoard = import('@/views/projectBoard/index.vue')
const DeptBoard = import('@/views/deptBoard/index.vue')
const DeptDetail = import('@/views/deptDetail/index.vue')

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/projectOverview'  },
  { path: '/projectOverview', component: ProjectOverview },
  { path: '/projectBoard', component: ProjectBoard },
  { path: '/deptBoard', component: DeptBoard },
  { path: '/deptDetail', component: DeptDetail }
]

export default routes