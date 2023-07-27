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
          <Echarts style="height: 8rem" :options="ecOptions.options5"></Echarts>
          <Echarts style="height: 8rem" :options="ecOptions.options5"></Echarts>
          <Echarts style="height: 8rem" :options="ecOptions.options5"></Echarts>
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
import LargeScreenMain from "@/views/largeScreenMain/index.vue";
import Header from "@/components/commons/Header.vue";
import Total from "@/components/commons/Total.vue";
import Echarts from "@/components/echarts/index.vue";

import Gantt from '@/components/gantt/index.vue';
import { projectStatusPie } from "../project/constant";
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
  options5: projectStatusPie
})
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
        width: 60%;
        min-width: 43rem;
        .title {

        }
      }
      .project-status {
        width: 40%;
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