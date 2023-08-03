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
      <ScreenCard title="科室项目分布" v-show="!selectTarget">
        <Echarts style="height: 10rem" :options="ecOptions.deptProjectOptions"></Echarts>
      </ScreenCard>
      <div class="dept-gantt-table" v-show="!selectTarget">
        <Gantt :list="gantt.list" :columns="gantt.columns"></Gantt>
      </div>
      <PersonTree v-show="selectTarget"></PersonTree>
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
import { getReportDataByCond } from "./service";
import { columns } from "@/constants/common";
import { getReportDataList } from "../projectBoard/service";
// import { getProjectOtherReport } from "../projectOverview/service";

const route = useRoute()

const totalData = reactive<{
  totalItems: Array<TotalItem>
}>({
  totalItems: [
    { label: '当前区域', value: '未知', click: () => { selectTarget.value = !selectTarget.value }},
    { label: '当前组别', value: ''},
    { label: '当前设计师', value: ''},
    { label: '当前项目总数', value: '0'},
    { label: '当前在研项目数', value: '0'},
    { label: '项目延期率', value: '0', unit: '%', color: '#FF0000'},
    { label: '一次开发成功率', value: '0', unit: '%', color: '#6DD400'},
    { label: '在研产品数', value: '0'},
  ]
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


onMounted(() => {
  const { name } = route.query as any
  totalData.totalItems[0].value = name
  getProjectNumTotal()
  // getOtherReport()
  getList()
})

const pie1: Array<PieItem> = _.cloneDeep(pie1Config)
const pie2: Array<PieItem> = _.cloneDeep(pie2Config)
const pie3: Array<PieItem> = _.cloneDeep(pie3Config)

const getProjectNumTotal = () => {
  let type = 1
  const { name } = route.query as any
  if (totalData.totalItems[2].value) {
    type = 3
  } else if (totalData.totalItems[1].value) {
    type = 2
  } else if (totalData.totalItems[0].value) {
    type = 1
  }
  getReportDataByCond({type, value: name})
    .then(res => {
      const {project_num, run_project, project_delay_rate, once_product_rate, run_product,project_state, project_urgent_state, project_warn_state, designer_stat, group_stat } = res.data || {}
      totalData.totalItems[3].value = project_num || 0
      totalData.totalItems[4].value = run_project || 0
      totalData.totalItems[5].value = project_delay_rate || 0
      totalData.totalItems[6].value = once_product_rate || 0
      totalData.totalItems[7].value = run_product || 0

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
      const pie4Color = [['#6DD400', '#4A9400'], ['#4E66FA', '#3D55E8'], ['#46F9FF'], ['#1DD2D8']]
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
// const getOtherReport = () => {
//   getProjectOtherReport().then(res => {
//     const { processData } = res.data || {}
//     // 处理节点进程数据
//     if (processData && !_.isEmpty(processData)) {
//       const xData = []
//       const legend = ['评估', '方案', '设计', '流片', '测试', '送样', '标准']
//       const data: any = [[], [], [], [], [], [], []]

//       const series = []
//       for (let i = 0; i < processData.length; i++) {
//         const item = processData[i];
//         xData.push(item.text)
//         data[0].push(item.value?.assess)
//         data[1].push(item.value?.plan)
//         data[2].push(item.value?.design)
//         data[3].push(item.value?.respin)
//         data[4].push(item.value?.test)
//         data[5].push(item.value?.sample)
//         data[6].push(item.value?.standar)
//       }
//       for (let i = 0; i < legend.length; i++) {
//         const leg = legend[i];
//         series.push(
//           {
//             name: leg,
//             type: "line",
//             stack: "Total",
//             smooth: true,
//             lineStyle: {
//               width: 2,
//             },
//             showSymbol: false,
//             data: data[i],
//           }
//         )
//       }
//       ecOptions.projectProgressOptions.legend.data = legend
//       ecOptions.projectProgressOptions.xAxis[0].data = xData
//       ecOptions.projectProgressOptions.series = series
//     }
//   })
// }
const getList = () => {
  let type = 4
  const { name } = route.query as any
  if (totalData.totalItems[2].value) {
    type = 6
  } else if (totalData.totalItems[1].value) {
    type = 5
  } else if (totalData.totalItems[0].value) {
    type = 4
  }
  getReportDataList({type, value: name}).then(res => {
    gantt.list = res.data.value
  })
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
  }
}
</style>