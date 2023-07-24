<template>
  <div class="large-screen-main">
    <Project></Project>
  </div>
</template>

<script setup lang='ts'>
import largeScreenAdaptation from '@/libs/largeScreenAdaptation';
import Project from '@/views/largeScreen/project/index.vue'

largeScreenAdaptation.init()


</script>
<style lang='scss'>
@import '../../styles/layout/large-screen.scss'
</style>