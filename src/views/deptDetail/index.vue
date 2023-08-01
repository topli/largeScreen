<template>
  <LargeScreenMain class="dept-gantt">
    <Header title="项目统计大屏"></Header>
    <div class="dept-gantt-body">
      <div class="dept-gantt-total">
        <div class="title">项目明细甘特图看版</div>
        <Total v-model="testData"></Total>
      </div>
      <PersonTree></PersonTree>
    </div>
  </LargeScreenMain>
</template>

<script setup lang='ts'>
import LargeScreenMain from "@/components/largeScreenMain/index.vue";
import Header from "@/components/commons/Header.vue";
import Total from "@/components/commons/Total.vue";
import PersonTree from "@/components/personTree/index.vue";

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