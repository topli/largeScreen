<template>
  <LargeScreenMain class="project-screen">
    <Header title="项目统计大屏"></Header>
    <div class="project-body">
      <div class="project-body-left">
        <ScreenCard title="科室项目分布">
          <div style="height: 160px;"></div>
        </ScreenCard>
        <ScreenCard title="项目进展分析">
          <div style="height: 160px;"></div>
        </ScreenCard>
      </div>
      <div class="project-body-center">

      </div>
      <div class="project-body-right">
        <ScreenCard title="大区统计">
          <div style="height: 160px;"></div>
        </ScreenCard>
        <ScreenCard title="领域分布">
          <div style="height: 160px;"></div>
        </ScreenCard>
      </div>
    </div>
  </LargeScreenMain>
</template>

<script setup lang='ts'>
import Header from '@/components/commons/Header.vue'
import ScreenCard from '@/components/commons/ScreenCard.vue';
import LargeScreenMain from '@/views/largeScreenMain/index.vue'
</script>
<style scoped lang='scss'>
.project-screen {
  color: #ffffff;
  font-family: YouSheBiaoTiHei;
  .project-body {
    display: flex;
    &-left {
      padding: 20px;
      width: 25%;
    }
    &-center {
      width: 50%;
    }
    &-right {
      padding: 20px;
      width: 25%;
    }
  }
}
</style>