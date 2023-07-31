<template>
  <LargeScreenMain class="project-gantt">
    <Header title="项目统计大屏"></Header>
    <div class="project-gantt-body">
      <div class="project-gantt-top">
        <div class="total-left">
          <div class="title">项目区域分布</div>
          <Total v-model="testData"></Total>
        </div>
        <div class="project-status">
          <Echarts style="height: 10rem" :options="ecOptions.options1"></Echarts>
          <Echarts style="height: 10rem" :options="ecOptions.options2"></Echarts>
          <Echarts style="height: 10rem" :options="ecOptions.options3"></Echarts>
        </div>
      </div>
      <div class="project-gantt-table">
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

import Gantt from '@/components/gantt/index.vue';
import { pie1Config, pie2Config, pie3Config, projectStatusPie } from "@/constants/ecOptions";
import { setPieData } from "@/libs/utils/ehcarts";
const testData = [
  { label: '当前区域', value: '全国' },
  { label: '区域项目总数', value: '554', unit: '单位'},
  { label: '区域在研项目数', value: '541', unit: '单位'},
  { label: '项目延期率', value: '21.3', unit: '%', color: '#FF0000'},
  { label: '一次开发成功率', value: '8.4', unit: '%', color: '#6DD400'},
  { label: '区域客户数', value: '771', unit: '单位'},
  { label: '在研产品数', value: '987', unit: '单位'},
]


const ecOptions = reactive({
  options1: projectStatusPie(),
  options2: projectStatusPie(),
  options3: projectStatusPie()
})
setPieData(ecOptions.options1, pie1Config, `区域项目\n总数状态\n分布`)
setPieData(ecOptions.options2, pie2Config, `在研项目\n紧急度\n分布`)
setPieData(ecOptions.options3, pie3Config, `在研项目\n预警状态\n分布`)
</script>
<style scoped lang='scss'>
.project-gantt {
  color: #ffffff;
  font-family: YouSheBiaoTiHei;
  background: url('~@/assets/images/project_bg.png') 100% 100% no-repeat;
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