<template>
  <LargeScreenMain class="project-gantt">
    <Header title="项目统计大屏"></Header>
    <div class="project-gantt-body">
      <div class="project-gantt-top">
        <div class="total-left">
          <div class="title">项目区域分布</div>
          <Total v-model="totalData.totalItems"></Total>
        </div>
        <div class="project-status">
          <Echarts style="height: 10rem" :options="ecOptions.projectStatusPie1"></Echarts>
          <Echarts style="height: 10rem" :options="ecOptions.projectStatusPie2"></Echarts>
          <Echarts style="height: 10rem" :options="ecOptions.projectStatusPie3"></Echarts>
        </div>
      </div>
      <div class="project-gantt-table">
        <Gantt :list="gantt.list" :columns="gantt.columns"></Gantt>
      </div>
    </div>
  </LargeScreenMain>
</template>

<script setup lang='ts'>
import { onMounted, reactive } from "vue";
import _ from 'lodash'
import LargeScreenMain from "@/components/largeScreenMain/index.vue";
import Header from "@/components/commons/Header.vue";
import Total from "@/components/commons/Total.vue";
import Echarts from "@/components/echarts/index.vue";

import Gantt from '@/components/gantt/index.vue';
import { pie1Config, pie2Config, pie3Config, PieItem, projectStatusPie } from "@/constants/ecOptions";
import { setPieData } from "@/libs/utils/ehcarts";
import { TotalItem } from "@/constants/project";
import { columns } from "@/constants/common";
import { getMapData } from "../projectOverview/service";
import { useRoute } from "vue-router";
import { getReportDataList } from "./service";

const totalData = reactive<{
  totalItems: Array<TotalItem>
}>({
  totalItems: [
    { label: '当前区域', value: '0'},
    { label: '区域项目总数', value: '0', unit: ''},
    { label: '区域在研项目数', value: '0', unit: ''},
    { label: '在研产品数', value: '0', unit: ''},
    { label: '区域客户数', value: '0', unit: ''},
    { label: '项目延期率', value: '0', unit: '%', color: '#FF0000'},
    { label: '一次开发成功率', value: '0', unit: '%', color: '#6DD400'},
  ]
})
const gantt = reactive({
  list: [],
  columns: columns
})

const ecOptions = reactive({
  projectStatusPie1: projectStatusPie(),
  projectStatusPie2: projectStatusPie(),
  projectStatusPie3: projectStatusPie()
})
setPieData(ecOptions.projectStatusPie1, pie1Config, `区域项目\n总数状态\n分布`)
setPieData(ecOptions.projectStatusPie2, pie2Config, `在研项目\n紧急度\n分布`)
setPieData(ecOptions.projectStatusPie3, pie3Config, `在研项目\n预警状态\n分布`)

const pie1: Array<PieItem> = _.cloneDeep(pie1Config)
const pie2: Array<PieItem> = _.cloneDeep(pie2Config)
const pie3: Array<PieItem> = _.cloneDeep(pie3Config)


const route = useRoute()

const getProjectNumTotal = () => {
  console.log(route);
  const { cur_level, name } = route.query as any
  // cur_level 地图层级深度 1 全国 2省 3市
  // type 后台接收参数  null: 全国 1 省 2 市
  let type = !cur_level || cur_level - 1 === 0 ? null : cur_level - 1
  // 直辖市 type传2
  if (['上海', '北京', '天津', '重庆'].includes(name ?? '')) {
    type = 2
  }
  getMapData({type, value: name})
    .then(res => {
      const { reportData } = res.data || {}
      if (reportData) {
        totalData.totalItems[1].value = reportData.project_num || 0
        totalData.totalItems[2].value = reportData.run_project || 0
        totalData.totalItems[3].value = reportData.run_product || 0
        totalData.totalItems[4].value = reportData.custom_num || 0
        totalData.totalItems[5].value = reportData.project_delay_rate || 0
        totalData.totalItems[6].value = reportData.once_product_rate || 0
      }

      pie1.map(item => {
        item.value = reportData.project_state[item.key] || 0
      })
      pie2.map(item => {
        item.value = reportData.project_urgent_state[item.key] || 0
      })
      pie3.map(item => {
        item.value = reportData.project_warn_state[item.key] || 0
      })
      // 设置饼图数据
      setPieData(ecOptions.projectStatusPie1, pie1, `区域项目\n总数状态\n分布`)
      setPieData(ecOptions.projectStatusPie2, pie2, `在研项目\n紧急度\n分布`)
      setPieData(ecOptions.projectStatusPie3, pie3, `在研项目\n预警状态\n分布`)
    })
}

const getList = () => {
  const { cur_level, name } = route.query as any
  const params = {
    type: cur_level,
    value: cur_level === 1 ? null : name
  }
  getReportDataList(params).then(res => {
    gantt.list = res.data.value
  })
}

onMounted(() => {
  const { name } = route.query as any
  totalData.totalItems[0].value = name === 'china' || !name ? '全国' : name

  console.log(totalData);
  
  // 获取地图数据
  getProjectNumTotal()
  getList()
})


</script>
<style scoped lang='scss'>
.project-gantt {
  color: #ffffff;
  font-family: YouSheBiaoTiHei;
  background: url('@/assets/images/project_bg.png') 100% 100% no-repeat;
  background-position: center;
  .project-gantt-body {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    .project-gantt-top {
      display: flex;
      .total-left {
        .total-container{
          margin-top: 1rem;
        }
      }
      .project-status {
        width: 50rem;
        display: flex;
      }
      .gantt {
        flex: 1;
      }
    }
    .project-gantt-table {
      flex: 1;
      overflow: hidden;
      :deep(.gantt-wrapper) {
        height: 100%;
        .ant-table-wrapper {
          height: calc(100% - 4rem);
        }
      }
    }
  }
}
</style>