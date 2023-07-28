<template>
  <div :style="screenStyle" class="large-screen-main">
    <slot></slot>
  </div>
</template>

<script setup lang='ts'>
import { screenResize } from '@/libs/hooks/largeScreen'

import largeScreenAdaptation from '@/libs/largeScreenAdaptation';
// 大屏自适应初始化
largeScreenAdaptation.init()

const screenStyle = screenResize()

</script>
<style lang='scss'>
@import '../../styles/layout/large-screen.scss'
</style>