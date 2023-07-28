<template>
  <!-- <Project></Project> -->
  <!-- <ProjectGantt></ProjectGantt> -->
  <DeptGantt></DeptGantt>
</template>

<script setup lang="ts">
// import Project from '@/views/project/index.vue'
// import ProjectGantt from '@/views/projectGantt/index.vue'
import DeptGantt from '@/views/deptGantt/index.vue'

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
