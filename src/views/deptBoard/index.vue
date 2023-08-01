<template>
  <LargeScreenMain class="dept-gantt">
    <Header title="项目统计大屏"></Header>
    <div class="dept-gantt-body">
      <div class="dept-gantt-total">
        <div class="title">项目明细甘特图看版</div>
        <Total v-model="testData"></Total>
      </div>
      <div class="project-status">
        <div class="project-status-title">
          <span>当前项目</span>
          <span>总数状态分布</span>
        </div>
        <Echarts style="height: 10rem;width: 14rem;" :options="ecOptions.projectStatusPie1"></Echarts>
        <Echarts style="height: 10rem;width: 14rem;" :options="ecOptions.projectStatusPie2"></Echarts>
        <Echarts style="height: 10rem;width: 14rem;" :options="ecOptions.projectStatusPie3"></Echarts>
        <div class="project-status-title">
          <span>科室项目</span>
          <span>组别分布</span>
        </div>
        <Echarts style="height: 10rem;width: 20rem;" :options="ecOptions.projectStatusPie4"></Echarts>
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
import LargeScreenMain from "@/components/largeScreenMain/index.vue";
import Header from "@/components/commons/Header.vue";
import Total from "@/components/commons/Total.vue";
import Echarts from "@/components/echarts/index.vue";
import ScreenCard from "@/components/commons/ScreenCard.vue"

import Gantt from '@/components/gantt/index.vue';
import { pie1Config, pie2Config, pie3Config, pie4Config, projectStatusPie } from "@/constants/ecOptions";
import { setPieData } from "@/libs/utils/ehcarts";
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
  projectStatusPie4: projectStatusPie()
})

setPieData(ecOptions.projectStatusPie1, pie1Config, `区域项目\n总数状态\n分布`)
setPieData(ecOptions.projectStatusPie2, pie2Config, `在研项目\n紧急度\n分布`)
setPieData(ecOptions.projectStatusPie3, pie3Config, `在研项目\n预警状态\n分布`)
setPieData(ecOptions.projectStatusPie4, pie4Config)
ecOptions.projectStatusPie4.series[0].center = ['30%', '50%'];
ecOptions.projectStatusPie4.series[1].center = ['30%', '50%'];
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