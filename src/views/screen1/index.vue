<template>
  <div class="screen1" :style="screenStyle"></div>
</template>

<script setup lang='ts'>
import largeScreenAdaptation from '@/libs/largeScreenAdaptation';
import { onMounted, onUnmounted } from 'vue';
import { reactive } from 'vue';

const screenStyle = reactive({
  height: '0px',
  width: '0px'
})

const getLargeSize = () => {
  screenStyle.height = largeScreenAdaptation.largeScreenSize.height + 'px'
  screenStyle.width = largeScreenAdaptation.largeScreenSize.width + 'px'
}
onMounted(() => {
  getLargeSize()
  largeScreenAdaptation.registerCB(getLargeSize)
})

onUnmounted(() => {
  largeScreenAdaptation.unregisterCB()
})
</script>
<style scoped lang='scss'>
.screen1 {
  background-color: #654125;
}
</style>