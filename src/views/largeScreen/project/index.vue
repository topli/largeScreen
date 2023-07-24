<template>
  <div :style="screenStyle" class="screen-container project-screen">
    <ScreenHeader></ScreenHeader>
    <Screen1></Screen1>
  </div>
</template>

<script setup lang='ts'>
import ScreenHeader from '../components/screenHeader/index.vue'
import Screen1 from './screen1.vue'
import LSA from '@/libs/largeScreenAdaptation';
import { onMounted, onUnmounted } from 'vue';
import { reactive } from 'vue';

const screenStyle = reactive({
  height: '0px',
  width: '0px'
})

const getLargeSize = () => {
  screenStyle.height = LSA.screenSize.height + 'px'
  screenStyle.width = LSA.screenSize.width + 'px'
}
onMounted(() => {
  getLargeSize()
  LSA.registerCB(getLargeSize)
})

onUnmounted(() => {
  LSA.unregisterCB()
})
</script>
<style scoped lang='scss'></style>