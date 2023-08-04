<template>
  <LargeScreenMain class="dept-gantt">
    <Header title="项目统计大屏"></Header>
    <div class="dept-gantt-body">
      <div class="dept-gantt-total">
        <div class="title">项目明细甘特图看版</div>
        <Total v-model="totalData.totalItems"></Total>
      </div>
      <div class="project-status" v-show="!selectTarget">
        <div class="project-status-title">
          <span>当前项目</span>
          <span>总数状态分布</span>
        </div>
        <Echarts style="height: 10rem;width: 15rem;" :options="ecOptions.projectStatusPie1"></Echarts>
        <Echarts style="height: 10rem;width: 15rem;" :options="ecOptions.projectStatusPie2"></Echarts>
        <Echarts style="height: 10rem;width: 15rem;" :options="ecOptions.projectStatusPie3"></Echarts>
        <div class="project-status-title">
          <span>科室项目</span>
          <span>组别分布</span>
        </div>
        <Echarts style="height: 10rem;width: 22rem;" :options="ecOptions.projectStatusPie4"></Echarts>
      </div>
      <ScreenCard title="科室项目分布" v-show="!selectTarget && query.type != 7">
        <Echarts style="height: 10rem" :options="ecOptions.deptProjectOptions"></Echarts>
      </ScreenCard>
      <div class="dept-gantt-table" v-show="!selectTarget">
        <Gantt :list="gantt.list" :columns="gantt.columns"></Gantt>
      </div>
      <PersonTree v-show="selectTarget" :data="members" @select-node="selectNode"></PersonTree>
    </div>
  </LargeScreenMain>
</template>

<script setup lang='ts'>
import { onMounted, reactive, ref } from "vue";
import LargeScreenMain from "@/components/largeScreenMain/index.vue";
import Header from "@/components/commons/Header.vue";
import Total from "@/components/commons/Total.vue";
import Echarts from "@/components/echarts/index.vue";
import ScreenCard from "@/components/commons/ScreenCard.vue"
import PersonTree from "@/components/personTree/index.vue";
import Gantt from '@/components/gantt/index.vue';

import { areaStatisticsOptions, pie1Config, pie2Config, pie3Config, pie4Config, PieItem, projectStatusPie } from "@/constants/ecOptions";
import { setPieData } from "@/libs/utils/ehcarts";
import { TotalItem } from "@/constants/project";
import { useRoute } from "vue-router";
import _ from "lodash";
import { getReportDataByCond, getMemberRelateData } from "./service";
import { columns } from "@/constants/common";
import { getReportDataList } from "../projectBoard/service";
// import { getProjectOtherReport } from "../projectOverview/service";

const route = useRoute()

const selectTargetFun = () => { selectTarget.value = !selectTarget.value }

const deptTotalItems: Array<TotalItem> = [
    { label: '当前区域', value: '未知', click: selectTargetFun },
    { label: '当前组别', value: '', click: selectTargetFun },
    { label: '当前设计师', value: '', click: selectTargetFun },
    { label: '当前项目总数', value: '0'},
    { label: '当前在研项目数', value: '0'},
    { label: '项目延期率', value: '0', unit: '%', color: 'rgba(243, 156, 51, 1)'},
    { label: '一次开发成功率', value: '0', unit: '%', color: 'rgba(109, 212, 0, 1)'},
    { label: '在研产品数', value: '0'},
  ]

const domainTotalItems: Array<TotalItem> = [
    { label: '当前领域', value: '未知', click: selectTargetFun },
    { label: '当前项目总数', value: '0'},
    { label: '当前在研项目数', value: '0'},
    { label: '项目延期率', value: '0', unit: '%', color: 'rgba(243, 156, 51, 1)'},
    { label: '一次开发成功率', value: '0', unit: '%', color: 'rgba(109, 212, 0, 1)'},
    { label: '在研产品数', value: '0'},
  ]


const totalData = reactive<{
  totalItems: Array<TotalItem>
}>({
  totalItems: []
})

const gantt = reactive({
  list: [],
  columns: columns
})

const ecOptions = reactive({
  options1: {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: 60,
      right: 40,
      bottom: 40,
      top: 40,
      textStyle: {
        color: "#fff",
      },
    },
    legend: {
      top: 10,
      right: 0,
      itemWidth: 14 ,
      itemHeight: 14 ,
      textStyle: {
        color: "#fff",
      },
      data: [
        { name: "完成", itemStyle: { color: '#00F1FF' } },
        { name: "进行", itemStyle: { color: '#0066F5' } },
        { name: "延期", itemStyle: { color: '#FF1400' } },
        { name: "项目总数", itemStyle: { color: '#6DD400' } }
      ],
    },

    xAxis: [
      {
        type: "category",
        axisLine: {
          lineStyle: {
            color: "#90979c",
          },
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitArea: {
          show: false,
        },
        axisLabel: {
          interval: 0,
        },
        data: ['姓名1', '姓名2', '姓名3', '姓名4', '姓名5', '姓名6', '姓名7', '姓名8', '姓名9', '姓名10', '姓名11', '姓名12', '姓名13'],
      },
    ],
    yAxis: [
      {
        type: "value",
        splitLine: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "#90979c",
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
        },
        splitArea: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: "完成",
        type: "bar",
        stack: "总量",
        barMaxWidth: 15,
        barGap: "10%",
        itemStyle: {
          color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                  offset: 0,
                  color: '#00F1FF' // 0% 处的颜色
              }, {
                  offset: 1,
                  color: 'rgba(0,241,255,0)' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
          },
          barBorderRadius: 15,
        },
        data: [
          709, 1917, 2455, 2610, 709, 1917, 2455, 2610, 709, 1917, 2455, 2610, 465
        ],
      },
      {
        name: "进行",
        type: "bar",
        stack: "总量",
        barMaxWidth: 15,
        itemStyle: {
          color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                  offset: 0,
                  color: '#0066F5' // 0% 处的颜色
              }, {
                  offset: 1,
                  color: 'rgba(0,102,245,0)' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
          },
          barBorderRadius: 15,
        },
        data: [327, 1776, 507, 1200, 327, 1776, 507, 1200, 709, 1917, 2455, 2610, 512],
      },
      {
        name: "延期",
        type: "bar",
        stack: "总量",
        barMaxWidth: 15,
        itemStyle: {
          color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                  offset: 0,
                  color: '#FF1400' // 0% 处的颜色
              }, {
                  offset: 1,
                  color: 'rgba(255,0,0,0)' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
          },
          barBorderRadius: 15,
        },
        data: [2807, 176, 57, 120],
      },
      {
        name: "项目总数",
        type: "line",
        data: [
          1036, 3693, 2962, 3810, 1036, 3693, 2962, 3810, 1036, 3693, 2962, 3810, 655
        ],
        smooth: true,
        lineStyle: {
          color: '#6DD400'
        }
      },
    ],
  },
  projectStatusPie1: projectStatusPie(),
  projectStatusPie2: projectStatusPie(),
  projectStatusPie3: projectStatusPie(),
  projectStatusPie4: projectStatusPie(),
  deptProjectOptions: areaStatisticsOptions(),
})

setPieData(ecOptions.projectStatusPie1, pie1Config, `区域项目\n总数状态\n分布`)
setPieData(ecOptions.projectStatusPie2, pie2Config, `在研项目\n紧急度\n分布`)
setPieData(ecOptions.projectStatusPie3, pie3Config, `在研项目\n预警状态\n分布`)
setPieData(ecOptions.projectStatusPie4, pie4Config)
ecOptions.projectStatusPie4.series[0].center = ['30%', '50%'];
ecOptions.projectStatusPie4.series[1].center = ['30%', '50%'];

let query = reactive<any>({})
onMounted(() => {
  query = route.query as any

  if (query.type == 7) {
    totalData.totalItems = domainTotalItems
  } else {
    totalData.totalItems = deptTotalItems
  }

  totalData.totalItems[0].value = query.name

  getProjectNumTotal()
  // getOtherReport()
  getList()

  getMembers()
})

const pie1: Array<PieItem> = _.cloneDeep(pie1Config)
const pie2: Array<PieItem> = _.cloneDeep(pie2Config)
const pie3: Array<PieItem> = _.cloneDeep(pie3Config)

const getParams = (types: Array<number>) => {
  let type = 0
  let name = ''
  if (query.type == 7) {
    type = types[3]
    name = totalData.totalItems[0].value as string
  } else {
    if (totalData.totalItems[2].value) {
      type = types[2]
      name = totalData.totalItems[2].value
    } else if (totalData.totalItems[1].value) {
      type = types[1]
      name = totalData.totalItems[1].value
    } else if (totalData.totalItems[0].value) {
      type = types[0]
      name = totalData.totalItems[0].value
    }
  }
  return {
    type,
    name
  }
}

const getProjectNumTotal = () => {
  const { type, name } = getParams([1,2,3,4])
  getReportDataByCond({type, value: name})
    .then(res => {
      const {project_num, run_project, project_delay_rate, once_product_rate, run_product,project_state, project_urgent_state, project_warn_state, designer_stat, group_stat } = res.data || {}
      console.log(query.type);
      if (query.type == 7) {
        totalData.totalItems[1].value = project_num || 0
        totalData.totalItems[2].value = run_project || 0
        totalData.totalItems[3].value = project_delay_rate || 0
        totalData.totalItems[4].value = once_product_rate || 0
        totalData.totalItems[5].value = run_product || 0
      } else {

        totalData.totalItems[3].value = project_num || 0
        totalData.totalItems[4].value = run_project || 0
        totalData.totalItems[5].value = project_delay_rate || 0
        totalData.totalItems[6].value = once_product_rate || 0
        totalData.totalItems[7].value = run_product || 0
      }

      pie1.map(item => {
        item.value = project_state[item.key] || 0
      })
      pie2.map(item => {
        item.value = project_urgent_state[item.key] || 0
      })
      pie3.map(item => {
        item.value = project_warn_state[item.key] || 0
      })
      // 设置饼图数据
      setPieData(ecOptions.projectStatusPie1, pie1, `区域项目\n总数状态\n分布`)
      setPieData(ecOptions.projectStatusPie2, pie2, `在研项目\n紧急度\n分布`)
      setPieData(ecOptions.projectStatusPie3, pie3, `在研项目\n预警状态\n分布`)
      
      const pie4Keys = Object.keys(group_stat)
      const pie4Color = [['#6DD400', '#4A9400'], ['#4E66FA', '#3D55E8'], ['#46F9FF', '#1DD2D8']]
      const pie4 = pie4Keys.map((key, i) => {
        return { name: key, color: pie4Color[i][0], innerColor: pie4Color[i][1], value: group_stat[key] }
      })

      setPieData(ecOptions.projectStatusPie4, pie4)

      if (designer_stat && Array.isArray(designer_stat)) {
        const xData = []
        // const legend = ['完成', '进行', '延期', '停止', '项目总数']
        const data: any = [[], [], [], []]

        for (let i = 0; i < designer_stat.length; i++) {
          const item = designer_stat[i];
          xData.push(item.key)
          const completed = item.val?.completed || 0
          const running = item.val?.running || 0
          const suspend = item.val?.suspend || 0
          // const cancel = item.val?.cancel || 0
          data[0].push(completed)
          data[1].push(running)
          data[2].push(suspend)
          // data[3].push(cancel)
          data[3].push(completed + running + suspend)
        }
        ecOptions.deptProjectOptions.xAxis[0].data = xData
        ecOptions.deptProjectOptions.series[0].data = data[0]
        ecOptions.deptProjectOptions.series[1].data = data[1]
        ecOptions.deptProjectOptions.series[2].data = data[2]
        // ecOptions.deptProjectOptions.series[3].data = data[3]
        ecOptions.deptProjectOptions.series[3].data = data[3]
      }
      console.log(ecOptions.deptProjectOptions);

    })
}
const getList = () => {
  const { type, name } = getParams([4,5,6,7])
  getReportDataList({type, value: name}).then(res => {
    gantt.list = res.data.value
  })
}

const members = ref()
const getMembers = () => {
  getMemberRelateData().then(res => {
    members.value = res.data
  })
}

const reloadData = () => {
  getProjectNumTotal()
  getList()
}

const selectNode = (path: any) => {
  const [first, second, third] = path
  
  totalData.totalItems[0].value = first ? first.department_name : ''
  totalData.totalItems[1].value = second ? second.group_name : ''
  totalData.totalItems[2].value = third ? third.display_name : ''
  selectTarget.value = false
  reloadData()
}


const selectTarget = ref(false)
</script>
<style scoped lang='scss'>
.dept-gantt {
  color: #ffffff;
  font-family: YouSheBiaoTiHei;
  background: url('@/assets/images/project_bg.png') 100% 100% no-repeat;
  background-position: center;
  .dept-gantt-body {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    .dept-gantt-total {
      .gantt {
        flex: 1;
      }
    }
    .project-status {
      padding: 1rem;
      display: flex;
      > .echarts {
        display: inline-block;
      }
      &-title {
        margin: 0 1rem;
        font-size: 0.5rem;
        display: inline-flex;
        background: url('@/assets/images/title_bg.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 1.8rem;
        height: 8.8rem;
        min-width: 29px;
        min-height: 162px;
        align-items: center;
        justify-content: center;
        padding: 0 2px;
        span {
          flex: 1;
          text-align: center;
        }
      }
    }
    :deep(.screen-card) {
      .screen-card-header {
        width: 400px;
      }
    }
    .dept-gantt-table {
      flex: 1;
      overflow: hidden;
      :deep(.gantt-wrapper) {
        height: 100%;
        .ant-table-wrapper {
          height: calc(100% - 4rem);
        }
      }
    }

    .person-tree-wrapper {
      flex: 1;
      .ant-tree {
        height: 100%;
      }
    }
  }
}
</style>