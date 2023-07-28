<template>
  <LargeScreenMain class="dept-gantt">
    <Header title="项目统计大屏"></Header>
    <div class="dept-gantt-body">
      <div class="dept-gantt-total">
        <div class="title">项目明细甘特图看版</div>
        <Total v-model="testData"></Total>
      </div>
      <div class="project-status">
        <Echarts style="height: 8rem" :options="ecOptions.options5"></Echarts>
        <Echarts style="height: 8rem" :options="ecOptions.options5"></Echarts>
        <Echarts style="height: 8rem" :options="ecOptions.options5"></Echarts>
      </div>
      <ScreenCard title="科室项目分布">
        <Echarts style="height: 10rem" :options="ecOptions.options1"></Echarts>
      </ScreenCard>
      <div class="dept-gantt-table">
        <Gantt></Gantt>
      </div>
    </div>
  </LargeScreenMain>
</template>

<script setup lang='ts'>
import { reactive } from "vue";
import LargeScreenMain from "@/views/largeScreenMain/index.vue";
import Header from "@/components/commons/Header.vue";
import Total from "@/components/commons/Total.vue";
import Echarts from "@/components/echarts/index.vue";
import ScreenCard from "@/components/commons/ScreenCard.vue"

import Gantt from '@/components/gantt/index.vue';
import { projectStatusPie } from "../project/constant";
const testData = [
  { label: '当前区域', value: '全国' },
  { label: '当前组别', value: '554'},
  { label: '当前设计师', value: '554'},
  { label: '当前项目总数', value: '554', unit: '单位'},
  { label: '当前在研项目数', value: '541', unit: '单位'},
  { label: '项目延期率', value: '21.3', unit: '%', color: '#FF0000'},
  { label: '一次开发成功率', value: '8.4', unit: '%', color: '#6DD400'},
  { label: '在研产品数', value: '987', unit: '单位'},
]


const ecOptions = reactive({
  options1: {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
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
        data: ['华北', '华东', '西北', '西南','华北', '华东', '西北', '西南'],
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
          709, 1917, 2455, 2610, 709, 1917, 2455, 2610
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
        data: [327, 1776, 507, 1200, 327, 1776, 507, 1200],
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
          1036, 3693, 2962, 3810, 1036, 3693, 2962, 3810
        ],
        smooth: true,
        lineStyle: {
          color: '#6DD400'
        }
      },
    ],
  },
  options5: projectStatusPie
})
</script>
<style scoped lang='scss'>
.dept-gantt {
  color: #ffffff;
  font-family: YouSheBiaoTiHei;
  background: url('~@/assets/images/project_bg.png') 100% 100% no-repeat;
  background-position: center;
  .dept-gantt-body {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    .dept-gantt-total {
      display: flex;
      flex-direction: column;
      width: 60%;
      .gantt {
        flex: 1;
      }
    }
    .project-status {
      width: 40%;
      display: flex;
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