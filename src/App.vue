<template>
  <!-- <ProjectOverview></ProjectOverview> -->
  <!-- <ProjectBoard></ProjectBoard> -->
  <!-- <DeptBoard></DeptBoard> -->
  <DeptDetail></DeptDetail>
</template>

<script setup lang="ts">
// import ProjectOverview from '@/views/projectOverview/index.vue'
// import ProjectBoard from '@/views/projectBoard/index.vue'
// import DeptBoard from '@/views/deptBoard/index.vue'
import DeptDetail from '@/views/deptDetail/index.vue'

</script>

<style lang="scss">
@import './styles/common/index.scss';
@import './styles/layout/app.scss';

#app {
  @include wh(100%, 100%);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #020E18;
  position: relative;
}
</style>
