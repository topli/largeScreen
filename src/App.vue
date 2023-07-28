<template>
  <projectOverview></projectOverview>
  <!-- <projectBoard></projectBoard> -->
  <!-- <deptBoard></deptBoard> -->
</template>

<script setup lang="ts">
import projectOverview from '@/views/projectOverview/index.vue'
// import projectBoard from '@/views/projectBoard/index.vue'
// import deptBoard from '@/views/deptBoard/index.vue'

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
