<template>
  <div class="large-screen-main"></div>
</template>

<script setup lang='ts'>
import largeScreenAdaptation from '@/libs/largeScreenAdaptation';

largeScreenAdaptation.init()


</script>
<style scoped lang='scss'>
.large-screen-main {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>